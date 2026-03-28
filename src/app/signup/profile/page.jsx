'use client';

import { useSignup } from '@/context/SignupContext';
import { SignupStepThree } from '@/components/signup/SignupStepThree';

export default function StepThreePage() {
  const signup = useSignup();

  return (
    <SignupStepThree
      formData={signup.formData}
      photoPreviewStyle={signup.photoPreviewStyle}
      updateField={signup.updateField}
      handlePhotoUpload={signup.handlePhotoUpload}
      openCropModal={signup.openCropModal}
      setStep={signup.setStep}
      canContinue={signup.canContinueStep3}
      usernameAvailability={signup.usernameAvailability}
      isCheckingUsername={signup.isCheckingUsername}
      completeSignup={signup.completeSignup}
      removePhoto={signup.removePhoto}
      isSubmitting={signup.isSubmitting}
      error={signup.error}
    />
  );
}
