import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Home } from '@/pages/Home'
import { Auth } from '@/pages/Auth'
import { NotFound } from '@/pages/NotFound'
import { Pricing } from '@/pages/Pricing'
import { SeoLanding } from '@/pages/SeoLanding'
import { SEO_LANDING_PAGES } from '@/constants/seoLandings'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/404.html" element={<NotFound />} />
        <Route path="/pricing" element={<Pricing />} />
        {SEO_LANDING_PAGES.map((page) => (
          <Route
            key={page.slug}
            path={page.path}
            element={<SeoLanding slug={page.slug} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
