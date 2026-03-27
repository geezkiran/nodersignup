'use client';

import { SignupCropModal } from '@/components/signup/SignupCropModal';
import { SignupHero } from '@/components/signup/SignupHero';
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
        className={`${styles.pageCard} ${
          signup.isCropModalOpen ? styles.pageCardMuted : ''
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
                  generatedOtp={signup.generatedOtp}
                  canContinue={signup.canContinueStep1}
                />
              )}

              {signup.step === 2 && (
                <SignupStepTwo
                  formData={signup.formData}
                  photoPreviewStyle={signup.photoPreviewStyle}
                  updateField={signup.updateField}
                  handlePhotoUpload={signup.handlePhotoUpload}
                  openCropModal={signup.openCropModal}
                  setStep={signup.setStep}
                  canContinue={signup.canContinueStep2}
                />
              )}

              {signup.step === 3 && (
                <SignupStepThree
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
