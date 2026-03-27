'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropBox, setCropBox] = useState(INITIAL_CROP_BOX);
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
    if (isValidEmail(formData.email) && formData.email !== otpEmail) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otp);
      setOtpEmail(formData.email);
      setFormData((previous) => ({ ...previous, otp: '' }));
    }
  }, [formData.email, otpEmail]);

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

  const otpDigits = (formData.otp || '').padEnd(4, '').slice(0, 4).split('');

  const handleOtpDigitChange = (index, rawValue) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    updateField('otp', nextDigits.join('').replace(/\s/g, ''));

    if (digit && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    if (event.key === 'Enter' && isValidEmail(formData.email) && formData.otp.trim().length === 4) {
      setStep(2);
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 4);

    if (!pasted) {
      return;
    }

    updateField('otp', pasted);
    otpInputRefs.current[Math.min(pasted.length - 1, 3)]?.focus();
  };

  return {
    step,
    setStep,
    formData,
    updateField,
    isValidEmail,
    generatedOtp,
    otpDigits,
    otpInputRefs,
    handleOtpDigitChange,
    handleOtpKeyDown,
    handleOtpPaste,
    canContinueStep1:
      isValidEmail(formData.email) && formData.otp.trim().length === 4,
    canContinueStep2:
      formData.password.trim().length >= 6,
    canContinueStep3:
      Boolean(formData.profileUsername.trim()),
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
    handleKeyDown: (event, canContinue, nextStep) => {
      if (event.key === 'Enter' && canContinue) {
        event.preventDefault();
        setStep(nextStep);
      }
    },
  };
}
