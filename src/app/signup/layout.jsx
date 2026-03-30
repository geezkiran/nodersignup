'use client';

import { SignupProvider, useSignup } from '@/context/SignupContext';
import { SignupHero } from '@/components/signup/SignupHero';
import styles from '../page.module.css';


function SignupLayoutInner({ children }) {
  const signup = useSignup();

  return (
    <div className={styles.pageShell}>
      <section
        id="waitlist"
        className={styles.pageCard}
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
