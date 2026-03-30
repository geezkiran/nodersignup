import styles from './signup-form.module.css';

export default function SignupThankYou() {
  return (
    <div className={styles.successStack}>
      <div className={styles.successCard}>
        <h2 className={styles.successText}>You’re already signed up!</h2>
        <p className={styles.successText}>
          Thank you for joining us. You can now return to the app or check your email for more info.
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
