import styles from './signup-form.module.css';

export function SignupStepFour({ formData, setStep }) {
  const username = (
    formData.profileUsername || formData.email.split('@')[0] || 'user'
  ).replace(/^@+/, '');

  return (
    <div className={styles.successStack}>
      <div className={styles.successCard}>
        <p className={styles.successUsername}>@{username}</p>

        <p className={styles.successText}>Your profile feels just right.</p>
      </div>

      <div className={styles.actionRow}>
        <div className={styles.secondaryActions}>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={styles.secondaryButton}
          >
            Edit profile
          </button>
          <a
            href="https://nodersurvey.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.surveyButton}
          >
            Take survey
          </a>
        </div>
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
