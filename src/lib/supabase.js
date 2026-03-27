import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !key || url === 'your-supabase-url' || key === 'your-supabase-anon-key') {
    console.warn('Supabase URL or Anon Key is missing or invalid. Check your .env.local file.')
    return null
  }

  try {
    return createBrowserClient(url, key)
  } catch (err) {
    console.error('Failed to create Supabase client:', err)
    return null
  }
}
