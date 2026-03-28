'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

const SignupContext = createContext();

const INITIAL_FORM = {
  email: '',
  otp: '',
  photo: '',
  profileUsername: '',
  displayName: '',
  password: '',
};

const INITIAL_CROP_BOX = { x: 54, y: 54, size: 180 };
const CROP_FRAME_SIZE = 288;
const MIN_CROP_SIZE = 90;

export const cropGridOverlayStyle = {
  backgroundImage:
    'linear-gradient(to right, transparent 33.25%, rgba(255,255,255,0.45) 33.25%, rgba(255,255,255,0.45) 33.55%, transparent 33.55%, transparent 66.45%, rgba(255,255,255,0.45) 66.45%, rgba(255,255,255,0.45) 66.75%, transparent 66.75%), linear-gradient(to bottom, transparent 33.25%, rgba(255,255,255,0.45) 33.25%, rgba(255,255,255,0.45) 33.55%, transparent 33.55%, transparent 66.45%, rgba(255,255,255,0.45) 66.45%, rgba(255,255,255,0.45) 66.75%, transparent 66.75%)',
};

export function SignupProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // Map descriptive route names to step numbers for internal logic
  const stepMap = useMemo(() => ({
    'email': 1,
    'password': 2,
    'profile': 3,
    'summary': 4,
  }), []);

  const stepNameMap = useMemo(() => ({
    1: 'email',
    2: 'password',
    3: 'profile',
    4: 'summary',
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
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropBox, setCropBox] = useState(INITIAL_CROP_BOX);
  
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
          ? window.location.origin + '/signup/email'
          : 'https://signup.noderhq.com/signup/email',
      },
    });
    if (error) setError(error.message);
  };

  const otpInputRefs = useRef([]);
  const cropFrameRef = useRef(null);
  const dragRef = useRef({
    active: false,
    type: 'move',
    pointerId: null,
    startX: 0,
    startY: 0,
    startBox: INITIAL_CROP_BOX,
  });

  const photoPreviewStyle = useMemo(() => {
    if (!formData.photo) return {};
    return {
      backgroundImage: `url(${formData.photo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#0f0f0f',
    };
  }, [formData.photo]);

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
            if (data?.username) setStep(4);
            else if (step < 2) setStep(2);
          })
          .catch(() => { if (step < 2) setStep(2); });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setFormData((prev) => ({ ...prev, email: session.user.email }));
        supabase.from('profiles').select('username').eq('id', session.user.id).single()
          .then(({ data }) => {
            if (data?.username) setStep(4);
            else if (step < 2) setStep(2);
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

  const clampCrop = (box) => {
    const size = Math.max(MIN_CROP_SIZE, Math.min(box.size, CROP_FRAME_SIZE));
    const x = Math.max(0, Math.min(box.x, CROP_FRAME_SIZE - size));
    const y = Math.max(0, Math.min(box.y, CROP_FRAME_SIZE - size));
    return { x, y, size };
  };

  const beginCropInteraction = (event, type) => {
    event.preventDefault();
    dragRef.current = {
      active: true,
      type,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startBox: cropBox,
    };
    cropFrameRef.current?.setPointerCapture?.(event.pointerId);
  };

  const onCropPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const start = drag.startBox;
    const next = { ...start };

    if (drag.type === 'move') { next.x = start.x + dx; next.y = start.y + dy; }
    else if (drag.type === 'se') { next.size = start.size + Math.max(dx, dy); }
    else if (drag.type === 'nw') { const newSize = start.size - Math.max(dx, dy); next.size = newSize; next.x = start.x + (start.size - newSize); next.y = start.y + (start.size - newSize); }
    else if (drag.type === 'ne') { const newSize = start.size + Math.max(dx, -dy); next.size = newSize; next.y = start.y + (start.size - newSize); }
    else if (drag.type === 'sw') { const newSize = start.size + Math.max(-dx, dy); next.size = newSize; next.x = start.x + (start.size - newSize); }
    else if (drag.type === 'n') { const newSize = start.size - dy; next.size = newSize; next.y = start.y + (start.size - newSize); }
    else if (drag.type === 's') { next.size = start.size + dy; }
    else if (drag.type === 'w') { const newSize = start.size - dx; next.size = newSize; next.x = start.x + (start.size - newSize); }
    else if (drag.type === 'e') { next.size = start.size + dx; }
    setCropBox(clampCrop(next));
  };

  const endCropInteraction = () => { dragRef.current.active = false; };

  const applySquareCrop = () => {
    if (!formData.photo) { setIsCropModalOpen(false); return; }
    const image = new Image();
    image.onload = () => {
      const naturalW = image.naturalWidth;
      const naturalH = image.naturalHeight;
      const scale = Math.max(CROP_FRAME_SIZE / naturalW, CROP_FRAME_SIZE / naturalH);
      const displayW = naturalW * scale;
      const displayH = naturalH * scale;
      const offsetX = (CROP_FRAME_SIZE - displayW) / 2;
      const offsetY = (CROP_FRAME_SIZE - displayH) / 2;
      const srcX = Math.max(0, (cropBox.x - offsetX) / scale);
      const srcY = Math.max(0, (cropBox.y - offsetY) / scale);
      const srcSize = Math.min(naturalW - srcX, naturalH - srcY, cropBox.size / scale);
      const canvas = document.createElement('canvas');
      const outputSize = 512;
      canvas.width = outputSize;
      canvas.height = outputSize;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(image, srcX, srcY, srcSize, srcSize, 0, 0, outputSize, outputSize);
      updateField('photo', canvas.toDataURL('image/png'));
      setIsCropModalOpen(false);
    };
    image.src = formData.photo;
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateField('photo', String(reader.result || ''));
      setCropBox(INITIAL_CROP_BOX);
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
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

            if (!authUser) {
                console.log('No user session found, attempting to sign up...');
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: { data: { username: formData.profileUsername } }
                });
                if (error) throw error;
                authUser = data.user;
                console.log('Signup successful, user ID:', authUser.id);
            } else if (formData.password) {
                console.log('Updating user password...');
                const { error: updateError } = await supabase.auth.updateUser({ password: formData.password });
                if (updateError) throw updateError;
            }

            if (!authUser) throw new Error('Could not retrieve user information.');

            let avatarUrl = null;
            if (formData.photo && formData.photo.startsWith('data:')) {
                try {
                    console.log('Uploading profile photo...');
                    const res = await fetch(formData.photo);
                    const blob = await res.blob();
                    const fileName = `${authUser.id}-${Math.floor(Date.now() / 1000)}.png`;
                    const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, blob, { upsert: true });
                    if (uploadError) {
                        console.error('Avatar upload failed:', uploadError);
                        // Don't block the whole process for avatar upload failures
                    } else {
                        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
                        avatarUrl = publicUrl;
                        console.log('Avatar uploaded successfully:', avatarUrl);
                    }
                } catch (imgErr) {
                    console.error('Error processing photo:', imgErr);
                }
            }

            console.log('Updating profile record...');
            const { error: profileError } = await supabase.from('profiles').upsert({
                id: authUser.id,
                username: formData.profileUsername.trim(),
                full_name: formData.displayName.trim(),
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            });

            if (profileError) {
                console.error('Profile upsert error:', profileError);
                throw profileError;
            }

            console.log('Signup flow complete, moving to step 4');
            setStep(4);
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
    canContinueStep2: formData.password.length >= 6 && formData.displayName.trim().length > 0,
    canContinueStep3: formData.profileUsername.trim().length >= 3 && usernameAvailability === 'available' && !isCheckingUsername,
    usernameAvailability,
    isCheckingUsername,
    photoPreviewStyle,
    isCropModalOpen,
    setIsCropModalOpen,
    cropBox,
    cropFrameRef,
    beginCropInteraction,
    onCropPointerMove,
    endCropInteraction,
    applySquareCrop,
    handlePhotoUpload,
    openCropModal: () => { setCropBox(INITIAL_CROP_BOX); setIsCropModalOpen(true); },
    removePhoto: () => updateField('photo', ''),
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
