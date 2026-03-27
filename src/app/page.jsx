'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import logo from './assets/logoicon.png';
import { signupStepContent } from '../data/signupStepContent';
import leftStyles from './signup-left-panel.module.css';

const INITIAL_FORM = {
  email: '',
  otp: '',
  photo: '',
  profileUsername: '',
  name: '',
  password: '',
};

const cropGridOverlayStyle = {
  backgroundImage:
    'linear-gradient(to right, transparent 33.25%, rgba(255,255,255,0.45) 33.25%, rgba(255,255,255,0.45) 33.55%, transparent 33.55%, transparent 66.45%, rgba(255,255,255,0.45) 66.45%, rgba(255,255,255,0.45) 66.75%, transparent 66.75%), linear-gradient(to bottom, transparent 33.25%, rgba(255,255,255,0.45) 33.25%, rgba(255,255,255,0.45) 33.55%, transparent 33.55%, transparent 66.45%, rgba(255,255,255,0.45) 66.45%, rgba(255,255,255,0.45) 66.75%, transparent 66.75%)',
};

const CROP_FRAME_SIZE = 288;
const MIN_CROP_SIZE = 90;

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropBox, setCropBox] = useState({ x: 54, y: 54, size: 180 });
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');

  const otpInputRefs = useRef([]);
  const cropFrameRef = useRef(null);
  const dragRef = useRef({
    active: false,
    type: 'move',
    pointerId: null,
    startX: 0,
    startY: 0,
    startBox: { x: 54, y: 54, size: 180 },
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
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  useEffect(() => {
    if (isValidEmail(formData.email) && formData.email !== otpEmail) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otp);
      setOtpEmail(formData.email);
      setFormData((prev) => ({ ...prev, otp: '' }));
    }
  }, [formData.email, otpEmail]);

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
    if (!drag.active) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const start = drag.startBox;

    let next = { ...start };

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
      const frame = CROP_FRAME_SIZE;
      const naturalW = image.naturalWidth;
      const naturalH = image.naturalHeight;

      const scale = Math.max(frame / naturalW, frame / naturalH);
      const displayW = naturalW * scale;
      const displayH = naturalH * scale;
      const offsetX = (frame - displayW) / 2;
      const offsetY = (frame - displayH) / 2;

      const srcX = Math.max(0, (cropBox.x - offsetX) / scale);
      const srcY = Math.max(0, (cropBox.y - offsetY) / scale);
      const srcSize = Math.min(
        naturalW - srcX,
        naturalH - srcY,
        cropBox.size / scale
      );

      const canvas = document.createElement('canvas');
      const out = 512;
      canvas.width = out;
      canvas.height = out;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(image, srcX, srcY, srcSize, srcSize, 0, 0, out, out);
      const cropped = canvas.toDataURL('image/png');
      updateField('photo', cropped);
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
      setCropBox({ x: 54, y: 54, size: 180 });
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const openCropModal = () => {
    if (!formData.photo) return;
    setCropBox({ x: 54, y: 54, size: 180 });
    setIsCropModalOpen(true);
  };

  const otpDigits = (formData.otp || '').padEnd(4, '').slice(0, 4).split('');

  const handleOtpDigitChange = (index, rawValue) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    const nextOtp = nextDigits.join('').replace(/\s/g, '');
    updateField('otp', nextOtp);
    if (digit && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;
    updateField('otp', pasted);
    const nextIndex = Math.min(pasted.length - 1, 3);
    otpInputRefs.current[nextIndex]?.focus();
  };

  const canContinueStep1 = isValidEmail(formData.email) && formData.otp.trim().length === 4;
  const canContinueStep2 =
    formData.photo &&
    formData.name.trim() &&
    formData.profileUsername.trim() &&
    formData.password.trim().length >= 6;

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-transparent px-3 py-3 md:-translate-y-10 md:px-5 md:py-6">
      <section
        id="waitlist"
        className={`mx-auto w-full max-w-lg rounded-[1.75rem] bg-[var(--bg-color)]/70 p-3 pb-28 shadow-[var(--shadow-md)] transition-opacity md:p-6 md:pb-8 ${
          isCropModalOpen ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <div className="grid gap-3 md:gap-4">
          <div className={`${leftStyles.mobilePanel} relative`}>
            <p className="absolute bottom-4 right-4 text-xs uppercase tracking-[0.08em] text-[var(--text-secondary)]">
              Step {step} of 3
            </p>
            <h1 className={leftStyles.mobileTitle}>
              {signupStepContent[step].title}
            </h1>
            <p className={leftStyles.mobileDescription}>
              {signupStepContent[step].description}
            </p>

            <div className={leftStyles.mobilePoints}>
              {signupStepContent[step].leftPoints.map((point) => (
                <p key={point} className={leftStyles.mobilePoint}>
                  {point}
                </p>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-color)] p-4 sm:p-5">
            <div className="flex min-h-full flex-col justify-start py-1 sm:py-2">
            {step === 1 && (
              <div className="mx-auto w-full max-w-md space-y-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dadce0] bg-white px-4 py-3 text-sm text-[#1f1f1f] transition hover:bg-[#f8f9fa]"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#24292f] bg-[#24292f] px-4 py-3 text-sm text-white transition hover:bg-[#1f2328]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.37 1.23-3.2-.12-.3-.53-1.51.12-3.14 0 0 1.01-.32 3.3 1.22a11.4 11.4 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.65 1.63.24 2.84.12 3.14.77.83 1.23 1.89 1.23 3.2 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.09.81 2.2v3.26c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                  </svg>
                  Continue with GitHub
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-[var(--border-color)]" />
                  <span className="text-xs tracking-wide text-[var(--text-secondary)]">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-[var(--border-color)]" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-[var(--text-secondary)]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--text-primary)]"
                  />
                </div>

                {isValidEmail(formData.email) && (
                  <div>
                    <label htmlFor="otp" className="mb-2 block text-sm text-[var(--text-secondary)]">
                      Enter 4-digit OTP
                    </label>
                    <div className="grid grid-cols-4 gap-2.5 sm:gap-2" onPaste={handleOtpPaste}>
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          inputMode="numeric"
                          maxLength={1}
                          value={otpDigits[index] || ''}
                          onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="h-12 w-full rounded-xl border border-[var(--border-color)] bg-transparent text-center text-lg text-[var(--text-primary)] outline-none transition focus:border-[var(--text-primary)] sm:h-12"
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">Demo OTP: {generatedOtp}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canContinueStep1}
                  className="w-full justify-center rounded-[20px] border border-white bg-white px-[13px] py-[10px] text-sm font-light uppercase tracking-[0.04em] text-black transition hover:bg-[#f2f2f2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mx-auto w-full max-w-md space-y-4">
                <div>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo" className="mx-auto mb-3 block w-fit cursor-pointer">
                    <span className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                      {formData.photo ? (
                        <span className="relative h-24 w-24 overflow-hidden rounded-full border border-[var(--border-color)]">
                          <span className="block h-full w-full" style={photoPreviewStyle} />
                        </span>
                      ) : (
                        <span
                          className="h-10 w-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-color)]"
                        />
                      )}
                      <span className="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-white text-lg leading-none text-black shadow">
                        +
                      </span>
                    </span>
                  </label>
                  {formData.photo && (
                    <button
                      type="button"
                      onClick={openCropModal}
                      className="mx-auto mt-1 block text-xs text-[var(--text-secondary)] underline underline-offset-4"
                    >
                      Edit crop
                    </button>
                  )}
                </div>

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-[var(--text-secondary)]">
                   
                  </label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label htmlFor="profileUsername" className="mb-2 block text-sm text-[var(--text-secondary)]">
                    
                  </label>
                  <input
                    id="profileUsername"
                    value={formData.profileUsername}
                    onChange={(e) => updateField('profileUsername', e.target.value)}
                    placeholder="Username"
                    className="w-full rounded-xl border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm text-[var(--text-secondary)]">
                    Create password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="minimum 6 characters"
                    className="w-full rounded-xl border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--text-primary)]"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full rounded-xl border border-[var(--border-color)] px-4 py-2.5 text-sm text-[var(--text-primary)] transition hover:border-[var(--text-primary)] sm:w-auto"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!canContinueStep2}
                    className="w-full justify-center rounded-[20px] border border-white bg-white px-5 py-2.5 text-sm font-light uppercase tracking-[0.04em] text-black transition hover:bg-[#f2f2f2] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mx-auto w-full max-w-md space-y-6">
                <div className="rounded-xl p-5 text-center">
                  <div className="mb-3 flex items-center justify-center">
                    <div
                      className="h-24 w-24 rounded-full"
                      style={photoPreviewStyle}
                    />
                  </div>

                  <p className="mt-1 text-sm text-[var(--text-primary)]">
                    @{(formData.profileUsername || formData.email.split('@')[0] || 'user').replace(/^@+/, '')}
                  </p>
                  <h3 className="mt-4 font-[var(--font-instrument-serif)] text-2xl text-[var(--text-primary)] md:text-3xl">
                    Hello, {formData.name || formData.profileUsername || formData.email.split('@')[0]}!
                  </h3>
                  <p className="mt-3 text-[var(--text-secondary)]">
                    The profile feels just right.
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full rounded-xl border border-[var(--border-color)] px-4 py-2.5 text-sm text-[var(--text-primary)] transition hover:border-[var(--text-primary)] sm:w-auto"
                  >
                    Edit profile
                  </button>
                  <a href="/" className="btn btn-primary w-full justify-center px-4 py-2 text-xs sm:w-auto">
                    Return home
                  </a>
                </div>
              </div>
            )}
            </div>

          </div>
        </div>
      </section>
      <div
        className="fixed bottom-4 left-1/2 z-20 w-[min(11.5rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-color)]/95 p-2 shadow-[var(--shadow-sm)] backdrop-blur md:bottom-4 md:w-44"
      >
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStep(item)}
              className={`h-9 rounded-lg border text-sm transition ${
                step === item
                  ? 'border-white bg-white text-black'
                  : 'border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--text-primary)]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-[var(--text-secondary)] md:hidden">
          Step {step} of 3
        </p>
      </div>

      {isCropModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-color)] p-4">
            <p className="mb-3 text-sm text-[var(--text-secondary)]">Move and resize the square crop area</p>
            <div
              ref={cropFrameRef}
              className="relative mx-auto h-72 w-72 overflow-hidden rounded-2xl border border-[var(--border-color)]"
              onPointerMove={onCropPointerMove}
              onPointerUp={endCropInteraction}
              onPointerCancel={endCropInteraction}
            >
              <img
                src={formData.photo}
                alt="Crop preview"
                className="h-full w-full object-cover select-none"
                draggable={false}
              />

              <div className="pointer-events-none absolute inset-0 bg-black/35" />

              <div
                className="absolute border border-white"
                style={{ left: cropBox.x, top: cropBox.y, width: cropBox.size, height: cropBox.size }}
                onPointerDown={(e) => beginCropInteraction(e, 'move')}
              >
                <div className="pointer-events-none absolute inset-0" style={cropGridOverlayStyle} />

                <span className="absolute -left-1 -top-1 h-2 w-2 cursor-nwse-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 'nw')} />
                <span className="absolute -right-1 -top-1 h-2 w-2 cursor-nesw-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 'ne')} />
                <span className="absolute -bottom-1 -left-1 h-2 w-2 cursor-nesw-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 'sw')} />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 cursor-nwse-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 'se')} />

                <span className="absolute left-1/2 top-0 h-2 w-5 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 'n')} />
                <span className="absolute bottom-0 left-1/2 h-2 w-5 -translate-x-1/2 translate-y-1/2 cursor-ns-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 's')} />
                <span className="absolute left-0 top-1/2 h-5 w-2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 'w')} />
                <span className="absolute right-0 top-1/2 h-5 w-2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full bg-white" onPointerDown={(e) => beginCropInteraction(e, 'e')} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsCropModalOpen(false)}
                className="rounded-xl border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-primary)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applySquareCrop}
                className="btn btn-primary px-5 py-2"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
