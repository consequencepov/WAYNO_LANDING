import { createClient } from '@supabase/supabase-js'
import type { ContactMethod } from '@/types'

/* ── Database types ── */

type LeadsRow = {
  id: string
  name: string
  contact_method: ContactMethod
  phone: string | null
  email: string | null
  source: string
  prompt_text: string | null
  attached_urls: string[]
  attached_file_names: string[]
  selected_design: string | null
  page_path: string | null
  page_url: string | null
  host: string | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: LeadsRow
        Insert: Omit<LeadsRow, 'id' | 'created_at'>
        Update: Partial<Omit<LeadsRow, 'id' | 'created_at'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

/* ── Singleton client (PKCE auth) ── */

let browserClient: ReturnType<typeof createClient<Database>> | null = null

function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (!url || !publishableKey) {
    throw new Error('Supabase environment variables are missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.')
  }

  return { url, publishableKey }
}

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient
  }

  const { url, publishableKey } = getSupabaseConfig()

  browserClient = createClient<Database>(url, publishableKey, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  })

  return browserClient
}
