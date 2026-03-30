import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupCatchAll() {
  const router = useRouter();

  useEffect(() => {
    // Optionally, you could check auth state here and redirect accordingly
    router.replace('/signup/thankyou');
  }, [router]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Redirecting…</h2>
      <p>If you are already signed up, you’ll see your thank you page. Otherwise, you’ll be redirected to the signup flow.</p>
    </div>
  );
}
