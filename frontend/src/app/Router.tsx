import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Home } from '@/pages/Home'
import { Auth } from '@/pages/Auth'
import { NotFound } from '@/pages/NotFound'
import { Legal } from '@/pages/Legal'
import { SeoLanding } from '@/pages/SeoLanding'
import { SEO_LANDING_PAGES } from '@/constants/seoLandings'
import { ProtectedRoute } from '@/components/features/auth/ProtectedRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      {/* Protected routes — requires valid Supabase session */}
      <Route element={<ProtectedRoute />}>
        {/* Future: dashboard, builder, settings go here */}
      </Route>

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/404.html" element={<NotFound />} />
        <Route path="/legal" element={<Legal />} />
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
