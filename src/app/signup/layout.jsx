'use client';

import { SignupProvider, useSignup, cropGridOverlayStyle } from '@/context/SignupContext';
import { SignupHero } from '@/components/signup/SignupHero';
import { SignupCropModal } from '@/components/signup/SignupCropModal';
// import { StepSwitcher } from '@/components/signup/StepSwitcher';
import styles from '../page.module.css';


function SignupLayoutInner({ children }) {
  const signup = useSignup();

  return (
    <div className={styles.pageShell}>
      <section
        id="waitlist"
        className={`${styles.pageCard} ${signup.isCropModalOpen ? styles.pageCardMuted : ''}`}
      >
        <div className={styles.contentStack}>
          <SignupHero step={signup.step} />

          <div className={styles.formCard}>
            <div className={styles.formInner}>
              {children}
            </div>
          </div>
        </div>
      </section>

      {/* <StepSwitcher step={signup.step} setStep={signup.setStep} /> */}

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

export default function SignupLayout({ children }) {
  return (
    <SignupProvider>
      <SignupLayoutInner>{children}</SignupLayoutInner>
    </SignupProvider>
  );
}
