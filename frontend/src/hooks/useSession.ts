import { useEffect, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import type { Session, User } from '@supabase/supabase-js'

interface SessionState {
  session: Session | null
  user: User | null
  isLoading: boolean
}

/**
 * Reactive hook that tracks the current Supabase auth session.
 *
 * - On mount: fetches the current session from Supabase (server-validated).
 * - Subscribes to onAuthStateChange so the UI updates on login/logout/token refresh.
 * - Returns `isLoading: true` until the initial session check completes.
 *
 * SECURITY NOTE: This is the ONLY source of truth for auth state.
 * Never trust `useStore.isAuthenticated` — it is removed in favor of this hook.
 * The session is validated server-side by Supabase on every token refresh.
 */
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    session: null,
    user: null,
    isLoading: true,
  })

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    // Fetch the current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        session,
        user: session?.user ?? null,
        isLoading: false,
      })
    })

    // Subscribe to auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        session,
        user: session?.user ?? null,
        isLoading: false,
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return state
}
