'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase';

const INITIAL_FORM = {
  email: '',
  otp: '',
  photo: '',
  profileUsername: '',
  password: '',
};

const INITIAL_CROP_BOX = { x: 54, y: 54, size: 180 };
const CROP_FRAME_SIZE = 288;
const MIN_CROP_SIZE = 90;

export const cropGridOverlayStyle = {
  backgroundImage:
    'linear-gradient(to right, transparent 33.25%, rgba(255,255,255,0.45) 33.25%, rgba(255,255,255,0.45) 33.55%, transparent 33.55%, transparent 66.45%, rgba(255,255,255,0.45) 66.45%, rgba(255,255,255,0.45) 66.75%, transparent 66.75%), linear-gradient(to bottom, transparent 33.25%, rgba(255,255,255,0.45) 33.25%, rgba(255,255,255,0.45) 33.55%, transparent 33.55%, transparent 66.45%, rgba(255,255,255,0.45) 66.45%, rgba(255,255,255,0.45) 66.75%, transparent 66.75%)',
};

export function useSignupFlow() {
  const [step, setStep] = useState(1);
  const supabase = createClient();

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
  const [usernameAvailability, setUsernameAvailability] = useState(null); // null, 'available', 'taken'
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Debounced username check
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
      setError('Supabase client not initialized. Please check your environment variables.');
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.hostname === 'localhost' 
          ? window.location.origin 
          : 'https://signup.noderhq.com',
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
    if (!formData.photo) {
      return {};
    }

    return {
      backgroundImage: `url(${formData.photo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#0f0f0f',
    };
  }, [formData.photo]);

  const updateField = (key, value) => {
    const nextValue =
      key === 'profileUsername' ? value.toLowerCase() : value;

    setFormData((previous) => ({ ...previous, [key]: nextValue }));
  };

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  useEffect(() => {
    if (!supabase) return;

    const handleAuthError = async (err) => {
      console.error('Auth sync error:', err);
      if (err.message?.includes('Refresh Token Not Found') || err.message?.includes('refresh_token_not_found')) {
        console.warn('Stale session detected, signing out to clear state...');
        await supabase.auth.signOut();
      }
    };

    // Initial session check
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          handleAuthError(error);
          return;
        }

        if (session) {
          setFormData((prev) => ({ ...prev, email: session.user.email }));
          supabase
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single()
            .then(({ data, error: profileError }) => {
              if (data?.username && !profileError) {
                setStep(4);
              } else if (step < 2) {
                setStep(2);
              }
            })
            .catch(() => {
              if (step < 2) setStep(2);
            });
        }
      })
      .catch(handleAuthError);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session);
        if (session) {
          setFormData((prev) => ({ ...prev, email: session.user.email }));
          // Check if profile exists also here
          supabase
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single()
            .then(({ data, error: profileError }) => {
              // If a username exists, they are a returning user, go to step 4
              if (data?.username && !profileError) {
                setStep(4);
              } 
              // Otherwise, if they just signed in/signed up, stay on Step 2 (Password)
              // We DON'T auto-advance to Step 3 because they need to set a password
              else if (step < 2) {
                setStep(2);
              }
            })
            .catch(() => {
              if (step < 2) setStep(2);
            });
        } else if (event === 'SIGNED_OUT') {
           // Reset to step 1 if signed out
           setStep(1);
        }
      }
    );

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
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const sendOtp = async () => {
    if (!isValidEmail(formData.email)) return;
    setIsSendingOtp(true);
    setError(null);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (otpError) throw otpError;
      setOtpSent(true);
      setCountdown(180); // 3 minutes
      console.log('OTP sent to:', formData.email);
    } catch (err) {
      console.error('Error sending OTP:', err);
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
      // First try 'email' type (standard for signInWithOtp)
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token,
        type: 'email',
      });
      
      if (verifyError) {
        // If 'email' fails, try 'signup' (sometimes used for new users)
        const { data: signupData, error: signupError } = await supabase.auth.verifyOtp({
          email: formData.email,
          token,
          type: 'signup',
        });
        if (signupError) throw verifyError; // Throw original 'email' error if both fail
        if (signupData.session) setStep(2);
      } else if (data.session) {
        setStep(2);
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      // Map Supabase token errors to a custom user-friendly message
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

  useEffect(() => {
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    if (isCropModalOpen) {
      body.style.overflow = 'hidden';
      documentElement.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = previousOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isCropModalOpen]);

  const clampCrop = (box) => {
    const size = Math.max(MIN_CROP_SIZE, Math.min(box.size, CROP_FRAME_SIZE));
    const x = Math.max(0, Math.min(box.x, CROP_FRAME_SIZE - size));
    const y = Math.max(0, Math.min(box.y, CROP_FRAME_SIZE - size));
    return { x, y, size };
  };

  const beginCropInteraction = (event, type) => {
    event.preventDefault();
    event.stopPropagation();

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
    if (!drag.active) {
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const start = drag.startBox;
    const next = { ...start };

    if (drag.type === 'move') {
      next.x = start.x + dx;
      next.y = start.y + dy;
    }

    if (drag.type === 'se') {
      next.size = start.size + Math.max(dx, dy);
    }

    if (drag.type === 'nw') {
      const newSize = start.size - Math.max(dx, dy);
      next.size = newSize;
      next.x = start.x + (start.size - newSize);
      next.y = start.y + (start.size - newSize);
    }

    if (drag.type === 'ne') {
      const newSize = start.size + Math.max(dx, -dy);
      next.size = newSize;
      next.y = start.y + (start.size - newSize);
    }

    if (drag.type === 'sw') {
      const newSize = start.size + Math.max(-dx, dy);
      next.size = newSize;
      next.x = start.x + (start.size - newSize);
    }

    if (drag.type === 'n') {
      const newSize = start.size - dy;
      next.size = newSize;
      next.y = start.y + (start.size - newSize);
    }

    if (drag.type === 's') {
      next.size = start.size + dy;
    }

    if (drag.type === 'w') {
      const newSize = start.size - dx;
      next.size = newSize;
      next.x = start.x + (start.size - newSize);
    }

    if (drag.type === 'e') {
      next.size = start.size + dx;
    }

    setCropBox(clampCrop(next));
  };

  const endCropInteraction = () => {
    dragRef.current.active = false;
  };

  const applySquareCrop = () => {
    if (!formData.photo) {
      setIsCropModalOpen(false);
      return;
    }

    const image = new Image();
    image.onload = () => {
      const naturalW = image.naturalWidth;
      const naturalH = image.naturalHeight;

      const scale = Math.max(
        CROP_FRAME_SIZE / naturalW,
        CROP_FRAME_SIZE / naturalH
      );
      const displayW = naturalW * scale;
      const displayH = naturalH * scale;
      const offsetX = (CROP_FRAME_SIZE - displayW) / 2;
      const offsetY = (CROP_FRAME_SIZE - displayH) / 2;

      const srcX = Math.max(0, (cropBox.x - offsetX) / scale);
      const srcY = Math.max(0, (cropBox.y - offsetY) / scale);
      const srcSize = Math.min(
        naturalW - srcX,
        naturalH - srcY,
        cropBox.size / scale
      );

      const canvas = document.createElement('canvas');
      const outputSize = 512;
      canvas.width = outputSize;
      canvas.height = outputSize;
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      context.drawImage(
        image,
        srcX,
        srcY,
        srcSize,
        srcSize,
        0,
        0,
        outputSize,
        outputSize
      );

      updateField('photo', canvas.toDataURL('image/png'));
      setIsCropModalOpen(false);
    };

    image.src = formData.photo;
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField('photo', String(reader.result || ''));
      setCropBox(INITIAL_CROP_BOX);
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const openCropModal = () => {
    if (!formData.photo) {
      return;
    }

    setCropBox(INITIAL_CROP_BOX);
    setIsCropModalOpen(true);
  };

  const otpDigits = (formData.otp || '').padEnd(6, '').slice(0, 6).split('');

  const handleOtpDigitChange = (index, rawValue) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    const newOtp = nextDigits.join('').replace(/\s/g, '');
    updateField('otp', newOtp);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    if (newOtp.length === 6) {
      verifyOtp(newOtp);
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pasted) {
      return;
    }

    updateField('otp', pasted);
    otpInputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();
    if (pasted.length === 6) {
      verifyOtp(pasted);
    }
  };

  return {
    step,
    setStep,
    formData,
    updateField,
    isValidEmail,
    otpDigits,
    otpInputRefs,
    handleOtpDigitChange,
    handleOtpKeyDown,
    handleOtpPaste,
    isSubmitting,
    error,
    signInWithProvider,
    completeSignup: async () => {
      if (!supabase) {
        setError('Supabase client not initialized. Please check your environment variables.');
        return;
      }
      setIsSubmitting(true);
      setError(null);
      console.log('Starting completeSignup...');
      try {
        let authUserResponse = await supabase.auth.getUser();
        
        if (authUserResponse.error) {
          console.error('getUser error:', authUserResponse.error);
          // If the session is broken, sign out and let the user try fresh
          if (authUserResponse.error.message?.includes('Refresh Token Not Found')) {
            await supabase.auth.signOut();
            throw new Error('Your session expired. Please try signing up again.');
          }
        }

        let authUser = authUserResponse.data.user;

        console.log('Current Auth User:', authUser);

        // 1. Sign up user if not already signed in via OAuth
        if (!authUser) {
          console.log('No active session, signing up with email/password...');
          const { data, error: authError } = await supabase.auth.signUp({
            email: formData.email.trim(),
            password: formData.password,
            options: {
              data: {
                username: formData.profileUsername,
              }
            }
          });
          if (authError) throw authError;
          if (!data.user) throw new Error('Signup failed. Please check your email for confirmation.');
          authUser = data.user;
          console.log('Signup successful:', authUser.id);
        } else if (formData.password) {
          // If already signed in (OAuth), but provided a password, update it for future use
          console.log('Updating password for existing session...');
          const { error: updateError } = await supabase.auth.updateUser({
            password: formData.password,
          });
          if (updateError) throw updateError;
          console.log('Password updated successfully!');
        }

        let avatarUrl = null;

        // 2. Upload photo if exists
        if (formData.photo && formData.photo.startsWith('data:')) {
          console.log('Uploading photo...');
          // Convert base64 to Blob
          const res = await fetch(formData.photo);
          const blob = await res.blob();
          const fileExt = 'png';
          const fileName = `${authUser.id}-${Math.floor(Date.now() / 1000)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, blob, { upsert: true });

          if (uploadError) {
            console.error('Photo upload error:', uploadError);
            // Don't throw here, just continue without avatar if upload fails?
            // Actually, better to throw if profile photo is expected.
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('avatars')
              .getPublicUrl(filePath);
            
            avatarUrl = publicUrl;
            console.log('Photo uploaded successfully:', avatarUrl);
          }
        }

        // 3. Create profile
        console.log('Creating profile in database...');
        const profileData = {
          id: authUser.id,
          username: formData.profileUsername.trim(),
          full_name: '', // Optional
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(profileData);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw profileError;
        }

        console.log('Profile created successfully!');
        setStep(4);
      } catch (err) {
        console.error('completeSignup failed:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    },
    canContinueStep1:
      isValidEmail(formData.email) && formData.otp.trim().length === 6,
    isSendingOtp,
    isVerifyingOtp,
    otpSent,
    sendOtp,
    countdown,
    canContinueStep2:
      formData.password.length >= 6 &&
      /[a-z]/.test(formData.password) &&
      /[A-Z]/.test(formData.password) &&
      /[0-9]/.test(formData.password) &&
      /[^a-zA-Z0-9]/.test(formData.password),
    passwordRequirements: {
      hasMinLength: formData.password.length >= 6,
      hasLower: /[a-z]/.test(formData.password),
      hasUpper: /[A-Z]/.test(formData.password),
      hasNumber: /[0-9]/.test(formData.password),
      hasSymbol: /[^a-zA-Z0-9]/.test(formData.password),
    },
    canContinueStep3:
      Boolean(formData.profileUsername.trim()) && 
      formData.profileUsername.trim().length >= 3 &&
      usernameAvailability === 'available' &&
      !isCheckingUsername,
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
    openCropModal,
    removePhoto: () => {
      setFormData((prev) => ({ ...prev, photo: '' }));
    },
    handleKeyDown: (event, canContinue, nextStep) => {
      if (event.key === 'Enter' && canContinue) {
        event.preventDefault();
        setStep(nextStep);
      }
    },
  };
}
