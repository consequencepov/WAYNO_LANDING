import { next } from '@vercel/edge'
import type { RequestContext } from '@vercel/edge'

/* ───────────────────────────────────────────
 *  WAYNO — Edge Middleware
 *  Runs BEFORE every request hits the origin.
 *
 *  Responsibilities:
 *  1. Anti-hotlink for media files (.mp4)
 *  2. General rate limiting per IP
 *  3. Bot user-agent blocking
 *  4. Security header enforcement
 * ─────────────────────────────────────────── */

const ALLOWED_HOSTS = ['wayno.ru', 'www.wayno.ru']

/* ── Known aggressive bot user-agents ── */
const BOT_PATTERNS = [
  /httrack/i,
  /wget/i,
  /curl/i,
  /python-requests/i,
  /scrapy/i,
  /node-fetch/i,
  /Go-http-client/i,
  /Java\//i,
  /libwww-perl/i,
  /PhantomJS/i,
  /headless/i,
]

/* ── Per-IP rate limiter (ephemeral, edge-local) ── */
const RATE_WINDOW_MS = 10_000 // 10 seconds
const MAX_REQUESTS_PER_WINDOW = 60 // 60 req / 10s = ~360/min (generous for SPA)

const ipCounts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipCounts.get(ip)

  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > MAX_REQUESTS_PER_WINDOW
}

// Periodic cleanup to prevent memory leak
function cleanupRateLimiter() {
  const now = Date.now()
  for (const [ip, entry] of ipCounts.entries()) {
    if (now > entry.resetAt) {
      ipCounts.delete(ip)
    }
  }
}

let lastCleanup = Date.now()

export default function middleware(request: Request, context: RequestContext) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const userAgent = request.headers.get('user-agent') ?? ''

  // Periodic cleanup every 30s
  if (Date.now() - lastCleanup > 30_000) {
    cleanupRateLimiter()
    lastCleanup = Date.now()
  }

  /* ── 1. Block known scraper user-agents ── */
  if (BOT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return new Response('Access denied.\n', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  /* ── 2. Rate limiting ── */
  if (checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '10',
      },
    })
  }

  /* ── 3. Anti-hotlink for video files ── */
  if (pathname.endsWith('.mp4')) {
    const referer = request.headers.get('referer')
    if (referer) {
      try {
        const refererHost = new URL(referer).hostname
        if (!ALLOWED_HOSTS.some((h) => refererHost === h || refererHost.endsWith('.' + h))) {
          return new Response('Hotlinking not allowed.\n', {
            status: 403,
            headers: { 'Content-Type': 'text/plain' },
          })
        }
      } catch {
        // Malformed referer — block
        return new Response('Forbidden.\n', {
          status: 403,
          headers: { 'Content-Type': 'text/plain' },
        })
      }
    }
    // No referer = direct access (allow — browsers sometimes omit referer for <video>)
  }

  /* ── 4. Block access to sensitive paths ── */
  if (
    pathname.startsWith('/.env') ||
    pathname.startsWith('/.git') ||
    pathname.endsWith('.map') ||
    pathname.includes('/.well-known/') && !pathname.startsWith('/.well-known/security.txt')
  ) {
    return new Response('Not found.\n', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  /* ── Pass through ── */
  return next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _vercel (Vercel internals)
     */
    '/((?!_vercel).*)',
  ],
}
