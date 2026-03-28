'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signup/email');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="animate-pulse font-light tracking-widest text-sm uppercase opacity-50">
        Initializing...
      </div>
    </div>
  );
}
