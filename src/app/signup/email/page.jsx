'use client';

import { useSignup } from '@/context/SignupContext';
import { SignupStepOne } from '@/components/signup/SignupStepOne';

export default function StepOnePage() {
  const signup = useSignup();

  return (
    <SignupStepOne
      formData={signup.formData}
      setStep={signup.setStep}
      updateField={signup.updateField}
      isValidEmail={signup.isValidEmail}
      otpDigits={signup.otpDigits}
      otpInputRefs={signup.otpInputRefs}
      handleOtpDigitChange={signup.handleOtpDigitChange}
      handleOtpKeyDown={signup.handleOtpKeyDown}
      handleOtpPaste={signup.handleOtpPaste}
      isSendingOtp={signup.isSendingOtp}
      isVerifyingOtp={signup.isVerifyingOtp}
      otpSent={signup.otpSent}
      sendOtp={signup.sendOtp}
      canContinue={signup.canContinueStep1}
      handleKeyDown={signup.handleKeyDown}
      signInWithProvider={signup.signInWithProvider}
      error={signup.error}
      countdown={signup.countdown}
    />
  );
}
