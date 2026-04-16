import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CookieConsent } from '../ui/CookieConsent'

export function Layout() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <Outlet />
      <Footer />
      <CookieConsent />
    </>
  )
}
