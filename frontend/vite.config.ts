import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { IncomingMessage, ServerResponse } from 'http'

/* -----------------------------------------------------------------------
 * Dev-only middleware: handles POST /api/submit-lead so that `npm run dev`
 * doesn't return 405. In production the Vercel serverless function runs.
 * ----------------------------------------------------------------------- */
function devApiPlugin() {
  return {
    name: 'dev-api-submit-lead',
    configureServer(server: { middlewares: { use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void } }) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url !== '/api/submit-lead') return next()

        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          })
          res.end()
          return
        }

        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json', Allow: 'POST' })
          res.end(JSON.stringify({ error: 'Method not allowed.' }))
          return
        }

        let raw = ''
        req.on('data', (chunk: Buffer) => { raw += chunk.toString() })
        req.on('end', () => {
          try {
            JSON.parse(raw) // validate JSON
            // In dev there is no real Supabase server-side key, so just return success.
            // Use `vercel dev` to test the full function with real env vars.
            console.info('[dev] /api/submit-lead called — returning mock 201 (use `vercel dev` for real writes)')
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: true }))
          } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Invalid JSON.' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), devApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor: React core + ReactDOM (keep together to avoid circular deps)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react'
          }
          // Vendor: Router
          if (id.includes('react-router')) {
            return 'vendor-router'
          }
          // Vendor: Framer Motion (heavy)
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }
          // Vendor: Lenis smooth scroll
          if (id.includes('node_modules/lenis')) {
            return 'vendor-lenis'
          }
          // Vendor: Embla carousel
          if (id.includes('embla-carousel')) {
            return 'vendor-embla'
          }
          // Vendor: Supabase
          if (id.includes('@supabase')) {
            return 'vendor-supabase'
          }
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
