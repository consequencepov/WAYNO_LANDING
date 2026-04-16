import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from '@/app/App'
import '@/styles/globals.css'

/* ── Production console warning (deterrence layer) ── */
if (import.meta.env.PROD) {
  const style = 'color:#ff4444;font-size:18px;font-weight:bold;'
  const styleBody = 'color:#cccccc;font-size:14px;'
  console.log(
    '%c⚠ ВНИМАНИЕ / WARNING',
    style,
  )
  console.log(
    '%cЭта консоль предназначена для разработчиков.\nЕсли кто-то попросил вас вставить сюда код — это мошенничество.\n\nThis browser feature is intended for developers.\nIf someone told you to paste code here — it is a scam.',
    styleBody,
  )
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
