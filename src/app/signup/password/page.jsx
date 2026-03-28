'use client';

import { useSignup } from '@/context/SignupContext';
import { SignupStepTwo } from '@/components/signup/SignupStepTwo';

export default function StepTwoPage() {
  const signup = useSignup();

  return (
    <SignupStepTwo
      formData={signup.formData}
      updateField={signup.updateField}
      setStep={signup.setStep}
      canContinue={signup.canContinueStep2}
      usernameAvailability={signup.usernameAvailability}
      isCheckingUsername={signup.isCheckingUsername}
    />
  );
}
