'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';

function SignupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    const handleCallback = async () => {
      if (error) {
        console.error('OAuth error:', error);
        return;
      }

      if (!code) {
        // No code, just show signup
        return;
      }

      try {
        const supabase = createClient();
        if (!supabase) {
          console.error('Supabase client not initialized');
          return;
        }

        // Exchange code for session
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error('Error exchanging code:', exchangeError);
          return;
        }

        console.log('Session established, redirecting to email step');
        // Redirect to email step
        router.replace('/signup/email');
      } catch (err) {
        console.error('Callback error:', err);
      }
    };

    handleCallback();
  }, [code, error, router]);

  return (
    <div>
      {code && !error ? (
        <p>Processing login...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Loading signup...</p>
      )}
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPageContent />
    </Suspense>
  );
}
