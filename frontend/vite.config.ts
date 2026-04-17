import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
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
