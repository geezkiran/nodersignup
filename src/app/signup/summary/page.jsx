'use client';

import { useSignup } from '@/context/SignupContext';
import { SignupStepFour } from '@/components/signup/SignupStepFour';

export default function StepFourPage() {
  const signup = useSignup();

  return (
    <SignupStepFour
      formData={signup.formData}
      photoPreviewStyle={signup.photoPreviewStyle}
      setStep={signup.setStep}
    />
  );
}
