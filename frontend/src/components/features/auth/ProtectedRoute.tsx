import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'

/**
 * Route guard that redirects unauthenticated users to /auth.
 *
 * Usage in Router:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *
 * SECURITY NOTE:
 * This is a UI convenience, NOT a security boundary. The real enforcement
 * happens server-side: Supabase RLS policies deny data access without a
 * valid JWT, and API routes validate the session header.
 * Even if someone bypasses this redirect via browser manipulation, they
 * will see an empty shell with no data.
 */
export function ProtectedRoute() {
  const { session, isLoading } = useSession()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-primary">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    // Preserve the intended destination so we can redirect after login
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
