'use client';

import { SignupCropModal } from '@/components/signup/SignupCropModal';
import { SignupHero } from '@/components/signup/SignupHero';
import { SignupStepFour } from '@/components/signup/SignupStepFour';
import { SignupStepOne } from '@/components/signup/SignupStepOne';
import { SignupStepThree } from '@/components/signup/SignupStepThree';
import { SignupStepTwo } from '@/components/signup/SignupStepTwo';
import { StepSwitcher } from '@/components/signup/StepSwitcher';
import { cropGridOverlayStyle, useSignupFlow } from '@/hooks/useSignupFlow';
import styles from './page.module.css';

export default function SignupPage() {
  const signup = useSignupFlow();

  return (
    <div className={styles.pageShell}>
      <section
        id="waitlist"
        className={`${styles.pageCard} ${signup.isCropModalOpen ? styles.pageCardMuted : ''
          }`}
      >
        <div className={styles.contentStack}>
          <SignupHero step={signup.step} />

          <div className={styles.formCard}>
            <div className={styles.formInner}>
              {signup.step === 1 && (
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
              )}

              {signup.step === 2 && (
                <SignupStepTwo
                  formData={signup.formData}
                  updateField={signup.updateField}
                  setStep={signup.setStep}
                  canContinue={signup.canContinueStep2}
                  passwordRequirements={signup.passwordRequirements}
                />
              )}

              {signup.step === 3 && (
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
              )}

              {signup.step === 4 && (
                <SignupStepFour
                  formData={signup.formData}
                  photoPreviewStyle={signup.photoPreviewStyle}
                  setStep={signup.setStep}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <StepSwitcher step={signup.step} setStep={signup.setStep} />

      <SignupCropModal
        isOpen={signup.isCropModalOpen}
        photo={signup.formData.photo}
        cropBox={signup.cropBox}
        cropGridOverlayStyle={cropGridOverlayStyle}
        cropFrameRef={signup.cropFrameRef}
        beginCropInteraction={signup.beginCropInteraction}
        onCropPointerMove={signup.onCropPointerMove}
        endCropInteraction={signup.endCropInteraction}
        onClose={() => signup.setIsCropModalOpen(false)}
        onApply={signup.applySquareCrop}
      />
    </div>
  );
}
