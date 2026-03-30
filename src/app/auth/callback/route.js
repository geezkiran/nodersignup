import { createClient } from '@supabase/supabase-js';
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

  try {
    // Create Supabase client with service role to exchange code
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Exchange the code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError);
      return NextResponse.redirect(
        new URL(`/signup?error=session_error`, request.url)
      );
    }

    // Create response redirecting to signup step 2
    const response = NextResponse.redirect(
      new URL('/signup/email', request.url)
    );

    // Set auth cookies so the client-side recognizes the session
    if (data?.session) {
      const { access_token, refresh_token } = data.session;
      
      response.cookies.set('sb-access-token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });

      response.cookies.set('sb-refresh-token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  } catch (err) {
    console.error('Callback error:', err);
    return NextResponse.redirect(
      new URL('/signup?error=callback_error', request.url)
    );
  }
}
