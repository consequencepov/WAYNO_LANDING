import { BrowserRouter, useLocation } from 'react-router-dom'
import { AppRouter } from './Router'
import { useLenis } from '@/hooks/useLenis'
import { Preloader } from '@/components/ui'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void
  }
}

function YandexMetrikaPageTracker() {
  const location = useLocation()
  const hasTrackedInitialRoute = useRef(false)

  useEffect(() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return
    }

    if (typeof window.ym !== 'function') {
      return
    }

    if (!hasTrackedInitialRoute.current) {
      hasTrackedInitialRoute.current = true
      return
    }

    const route = `${location.pathname}${location.search}${location.hash}`
    window.ym(108587337, 'hit', route, {
      title: document.title,
      referer: document.referrer,
    })
  }, [location])

  return null
}

function AppInner() {
  useLenis()
  return (
    <>
      <Preloader />
      <YandexMetrikaPageTracker />
      <AppRouter />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
