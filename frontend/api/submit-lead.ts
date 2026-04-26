import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

/* ───────────────────────────────────────────
 *  RATE LIMITER — in-memory per-IP counter
 *  (for persistent rate limiting use Vercel KV)
 * ─────────────────────────────────────────── */
const RATE_WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 5 // max 5 submissions per window per IP

const ipCounts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipCounts.get(ip)

  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > MAX_REQUESTS
}

/* ───────────────────────────────────────────
 *  VALIDATION
 * ─────────────────────────────────────────── */
const ALLOWED_ORIGINS = [
  'https://wayno.ru',
  'https://www.wayno.ru',
]

const CONTACT_METHODS = ['phone', 'email'] as const
type ContactMethod = (typeof CONTACT_METHODS)[number]

const MAX_NAME_LENGTH = 200
const MAX_CONTACT_LENGTH = 200
const MAX_PROMPT_LENGTH = 5000
const MAX_URL_LENGTH = 2048
const MAX_URLS_COUNT = 10
const MAX_FILENAME_LENGTH = 255
const MAX_FILES_COUNT = 10
const MAX_SOURCE_LENGTH = 100
const MAX_DESIGN_LENGTH = 200

interface LeadPayload {
  name: string
  contactMethod: ContactMethod
  contact: string
  source?: string
  promptText?: string
  attachedUrls?: string[]
  attachedFileNames?: string[]
  selectedDesign?: string | null
  pagePath?: string
  pageUrl?: string
  host?: string
}

function sanitize(value: unknown, maxLen: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  return trimmed.slice(0, maxLen)
}

function sanitizeList(values: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(values)) return []
  return values
    .slice(0, maxItems)
    .map((v) => sanitize(v, maxLen))
    .filter((v): v is string => v !== null)
}

function validatePayload(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.' }
  }

  const b = body as Record<string, unknown>

  const name = sanitize(b.name, MAX_NAME_LENGTH)
  if (!name) return { ok: false, error: 'Name is required.' }

  const contactMethod = sanitize(b.contactMethod, 10)
  if (!contactMethod || !CONTACT_METHODS.includes(contactMethod as ContactMethod)) {
    return { ok: false, error: 'Invalid contact method.' }
  }

  const contact = sanitize(b.contact, MAX_CONTACT_LENGTH)
  if (!contact) return { ok: false, error: 'Contact is required.' }

  // Basic email format check (server-side)
  if (contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
    return { ok: false, error: 'Invalid email format.' }
  }

  // Basic phone sanity check
  if (contactMethod === 'phone' && !/^[+\d\s\-()]{6,20}$/.test(contact)) {
    return { ok: false, error: 'Invalid phone format.' }
  }

  return {
    ok: true,
    data: {
      name,
      contactMethod: contactMethod as ContactMethod,
      contact,
      source: sanitize(b.source, MAX_SOURCE_LENGTH) ?? 'site_cta',
      promptText: sanitize(b.promptText, MAX_PROMPT_LENGTH) ?? undefined,
      attachedUrls: sanitizeList(b.attachedUrls, MAX_URLS_COUNT, MAX_URL_LENGTH),
      attachedFileNames: sanitizeList(b.attachedFileNames, MAX_FILES_COUNT, MAX_FILENAME_LENGTH),
      selectedDesign: sanitize(b.selectedDesign, MAX_DESIGN_LENGTH),
      pagePath: sanitize(b.pagePath, MAX_URL_LENGTH) ?? undefined,
      pageUrl: sanitize(b.pageUrl, MAX_URL_LENGTH) ?? undefined,
      host: sanitize(b.host, 255) ?? undefined,
    },
  }
}

/* ───────────────────────────────────────────
 *  SUPABASE (server-side with service key)
 * ─────────────────────────────────────────── */
function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase server environment variables.')
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/* ───────────────────────────────────────────
 *  HANDLER
 * ─────────────────────────────────────────── */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.includes(req.headers['origin'] ?? '') ? (req.headers['origin'] as string) : '')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  // CSRF: Origin check
  const origin = req.headers['origin'] ?? ''
  const isDev = process.env.VERCEL_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
  if (!isDev && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden.' })
  }

  // Rate limiting by IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.socket.remoteAddress ?? 'unknown'
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', '60')
    return res.status(429).json({ error: 'Too many requests. Try again in 1 minute.' })
  }

  // Validate input
  const validation = validatePayload(req.body)
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error })
  }

  const { data } = validation

  // Insert lead into Supabase
  try {
    const supabase = getSupabaseAdmin()

    const { error: dbError } = await supabase.from('leads').insert({
      name: data.name,
      contact_method: data.contactMethod,
      phone: data.contactMethod === 'phone' ? data.contact : null,
      email: data.contactMethod === 'email' ? data.contact.toLowerCase() : null,
      source: data.source ?? 'site_cta',
      prompt_text: data.promptText ?? null,
      attached_urls: data.attachedUrls ?? [],
      attached_file_names: data.attachedFileNames ?? [],
      selected_design: data.selectedDesign ?? null,
      page_path: data.pagePath ?? null,
      page_url: data.pageUrl ?? null,
      host: data.host ?? null,
      ip_address: ip,
    })

    if (dbError) {
      // Log server-side, never leak DB internals to client
      console.error('[submit-lead] Supabase error:', dbError.message)
      return res.status(500).json({ error: 'Failed to save. Please try again.' })
    }

    return res.status(201).json({ success: true })
  } catch (err) {
    console.error('[submit-lead] Unexpected error:', err)
    return res.status(500).json({ error: 'Internal error.' })
  }
}
