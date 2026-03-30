'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

const SignupContext = createContext();

const INITIAL_FORM = {
  email: '',
  otp: '',
  profileUsername: '',
  displayName: '',
};

export function SignupProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // Map descriptive route names to step numbers for internal logic
  const stepMap = useMemo(() => ({
    'email': 1,
    'profile': 2,
    'summary': 3,
  }), []);

  const stepNameMap = useMemo(() => ({
    1: 'email',
    2: 'profile',
    3: 'summary',
  }), []);

  const step = useMemo(() => {
    const parts = pathname?.split('/').filter(Boolean);
    const routeName = parts?.[parts.length - 1];
    return stepMap[routeName] || 1;
  }, [pathname, stepMap]);

  const setStep = (nextStep) => {
    const nextStepName = typeof nextStep === 'number' ? stepNameMap[nextStep] : nextStep;
    if (nextStepName) {
      setError(null); // Clear errors when moving between steps
      router.push(`/signup/${nextStepName}`);
    } else {
      console.warn('Invalid step requested:', nextStep);
    }
  };

  const [formData, setFormData] = useState(INITIAL_FORM);
  
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const [otpEmail, setOtpEmail] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [usernameAvailability, setUsernameAvailability] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    const username = formData.profileUsername.trim();
    if (username.length < 3) {
      setUsernameAvailability(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingUsername(true);
      try {
        const { data, error: checkError } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .maybeSingle();

        if (checkError) throw checkError;
        setUsernameAvailability(data ? 'taken' : 'available');
      } catch (err) {
        console.error('Error checking username:', err);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.profileUsername, supabase]);

  const signInWithProvider = async (provider) => {
    if (!supabase) {
      setError('Supabase client not initialized.');
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.hostname === 'localhost'
          ? window.location.origin + '/signup?step=2'
          : 'https://signup.noderhq.com/signup?step=2',
      },
    });
    if (error) setError(error.message);
  };

  const otpInputRefs = useRef([]);

  const updateField = (key, value) => {
    const nextValue = key === 'profileUsername' ? value.toLowerCase() : value;
    setFormData((prev) => ({ ...prev, [key]: nextValue }));
  };

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setFormData((prev) => ({ ...prev, email: session.user.email }));
        supabase.from('profiles').select('username').eq('id', session.user.id).single()
          .then(({ data }) => {
            if (data?.username) setStep(3);
            else if (step < 2) setStep(2);
          })
          .catch(() => { if (step < 2) setStep(2); });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setFormData((prev) => ({ ...prev, email: session.user.email }));
        const hasGoogle = Array.isArray(session.user.identities)
          ? session.user.identities.some((id) => id.provider === 'google')
          : false;
        supabase.from('profiles').select('username').eq('id', session.user.id).single()
          .then(({ data }) => {
            if (hasGoogle && data?.username) {
              // Only redirect if not already on thankyou page
              if (!window.location.pathname.includes('/signup/thankyou')) {
                window.location.replace('/signup/thankyou');
              }
            } else if (step < 2) setStep(2);
          })
          .catch(() => { if (step < 2) setStep(2); });
      } else if (event === 'SIGNED_OUT') {
        setStep(1);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (isValidEmail(formData.email) && formData.email !== otpEmail) {
      setOtpEmail(formData.email);
      setOtpSent(false);
      setCountdown(0);
      updateField('otp', '');
    }
  }, [formData.email, otpEmail]);

  useEffect(() => {
    let timer;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const sendOtp = async () => {
    if (!isValidEmail(formData.email)) return;
    setIsSendingOtp(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: { 
          shouldCreateUser: true,
          emailRedirectTo: window.location.hostname === 'localhost' 
            ? window.location.origin + '/signup/email'
            : 'https://signup.noderhq.com/signup/email',
        },
      });
      if (error) throw error;
      setOtpSent(true);
      setOtpEmail(formData.email);
      setCountdown(180);
    } catch (err) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async (token) => {
    if (!token || token.length !== 6) return;
    setIsVerifyingOtp(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token,
        type: 'email',
      });
      
      if (error) {
        const { data: signupData, error: signupError } = await supabase.auth.verifyOtp({
          email: formData.email,
          token,
          type: 'signup',
        });
        if (signupError) throw error;
        if (signupData.session) setStep(2);
      } else if (data.session) {
        setStep(2);
      }
    } catch (err) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('expired') || msg.toLowerCase().includes('incorrect')) {
        setError('otp is incorrect or invalid');
      } else {
        setError(msg || 'otp is incorrect or invalid');
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const value = {
    step,
    setStep,
    formData,
    updateField,
    isValidEmail,
    otpDigits: (formData.otp || '').padEnd(6, '').slice(0, 6).split(''),
    otpInputRefs,
    handleOtpDigitChange: (index, rawValue) => {
      const digit = rawValue.replace(/\D/g, '').slice(-1);
      const nextDigits = [...(formData.otp || '').padEnd(6, '').slice(0, 6).split('')];
      nextDigits[index] = digit;
      const newOtp = nextDigits.join('').replace(/\s/g, '');
      updateField('otp', newOtp);
      if (digit && index < 5) otpInputRefs.current[index + 1]?.focus();
      if (newOtp.length === 6) verifyOtp(newOtp);
    },
    handleOtpKeyDown: (index, event) => {
      if (event.key === 'Backspace' && !formData.otp[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    },
    handleOtpPaste: (event) => {
      event.preventDefault();
      const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      if (!pasted) return;
      updateField('otp', pasted);
      otpInputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();
      if (pasted.length === 6) verifyOtp(pasted);
    },
    isSubmitting,
    error,
    signInWithProvider,
    completeSignup: async () => {
        setIsSubmitting(true);
        setError(null);
        try {
            console.log('Finalizing signup for:', formData.email);
            let authResponse = await supabase.auth.getUser();
            let authUser = authResponse.data.user;

            if (!authUser) throw new Error('Could not retrieve user information.');

            console.log('Updating profile record...');
            const { error: profileError } = await supabase.from('profiles').upsert({
                id: authUser.id,
                username: formData.profileUsername.trim(),
                full_name: formData.displayName.trim(),
                updated_at: new Date().toISOString(),
            });

            if (profileError) {
                console.error('Profile upsert error:', profileError);
                throw profileError;
            }

            console.log('Signup flow complete, moving to step 3');
            setStep(3);
        } catch (err) {
            console.error('Complete signup error:', err);
            setError(err.message || 'An error occurred during finalization.');
        } finally {
            setIsSubmitting(false);
        }
    },
    canContinueStep1: isValidEmail(formData.email) && formData.otp.trim().length === 6,
    isSendingOtp,
    isVerifyingOtp,
    otpSent,
    sendOtp,
    countdown,
    canContinueStep2: formData.profileUsername.trim().length >= 3 && 
                     usernameAvailability === 'available' && 
                     !isCheckingUsername,
    usernameAvailability,
    isCheckingUsername,
    handleKeyDown: (event, canContinue, nextStep) => {
        if (event.key === 'Enter' && canContinue) {
            event.preventDefault();
            setStep(nextStep);
        }
    },
  };

  return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
}

export const useSignup = () => useContext(SignupContext);
