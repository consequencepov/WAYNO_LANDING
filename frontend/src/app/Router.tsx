import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '@/components/layout'
import { Home } from '@/pages/Home'
import { SEO_LANDING_PAGES } from '@/constants/seoLandings'

const Auth = lazy(() => import('@/pages/Auth').then(m => ({ default: m.Auth })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))
const Legal = lazy(() => import('@/pages/Legal').then(m => ({ default: m.Legal })))
const SeoLanding = lazy(() => import('@/pages/SeoLanding').then(m => ({ default: m.SeoLanding })))
const ProtectedRoute = lazy(() => import('@/components/features/auth/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })))

export function AppRouter() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  )
}
