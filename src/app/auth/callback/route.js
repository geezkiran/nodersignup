import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, error_description);
    return NextResponse.redirect(
      new URL(`/signup?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  // If no code, redirect to signup
  if (!code) {
    console.warn('No authorization code received');
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  // Create response object first
  const response = NextResponse.redirect(new URL('/signup/email', request.url));

  try {
    // Create Supabase server client with proper cookie handling
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getSetCookie().map(cookie => {
              const [nameValue] = cookie.split(';');
              const [name, value] = nameValue.split('=');
              return { name: name.trim(), value: decodeURIComponent(value || '') };
            });
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    // Exchange the code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError);
      return NextResponse.redirect(
        new URL(`/signup?error=session_error`, request.url)
      );
    }

    console.log('Session exchanged successfully');
    return response;
  } catch (err) {
    console.error('Callback error:', err);
    return NextResponse.redirect(
      new URL('/signup?error=callback_error', request.url)
    );
  }
}
