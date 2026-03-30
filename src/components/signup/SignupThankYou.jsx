"use client";
import { useEffect, useState } from 'react';
import styles from './signup-form.module.css';

export default function SignupThankYou() {
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);
    const timeout = setTimeout(() => {
      window.location.href = 'https://noderhq.com';
    }, 7000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={styles.successStack}>
      <div className={styles.successCard}>
        <h2 className={styles.successText}>You’re already signed up!</h2>
        <p className={styles.successText}>
          Thank you for joining us. You can now return to the app or check your email for more info.<br />
          <span style={{ fontSize: '0.95em', color: '#888' }}>
            You’ll be redirected to the homepage in <b>{countdown}</b> second{countdown !== 1 ? 's' : ''}…
          </span>
        </p>
      </div>
      <div className={styles.actionRow}>
        <a
          href="https://noderhq.com"
          className={`${styles.secondaryButton} ${styles.returnHomeSecondary}`}
        >
          Return home
        </a>
      </div>
    </div>
  );
}
