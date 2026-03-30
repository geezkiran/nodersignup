'use client';

import { useSignup } from '@/context/SignupContext';
import { SignupStepThree } from '@/components/signup/SignupStepThree';

export default function StepThreePage() {
  const signup = useSignup();

  return (
    <SignupStepThree
      formData={signup.formData}
      updateField={signup.updateField}
      canContinue={signup.canContinueStep2}
      usernameAvailability={signup.usernameAvailability}
      isCheckingUsername={signup.isCheckingUsername}
      completeSignup={signup.completeSignup}
      isSubmitting={signup.isSubmitting}
      error={signup.error}
    />
  );
}
