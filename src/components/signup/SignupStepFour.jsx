import styles from './signup-form.module.css';

export function SignupStepFour({ formData, photoPreviewStyle, setStep }) {
  const username = (
    formData.profileUsername || formData.email.split('@')[0] || 'user'
  ).replace(/^@+/, '');

  return (
    <div className={styles.successStack}>
      <div className={styles.successCard}>
        <div className={styles.successAvatarWrap}>
          <div
            className={`${styles.successAvatar} ${formData.photo ? '' : styles.successAvatarFallback
              }`}
            style={photoPreviewStyle}
          />
        </div>

        <p className={styles.successUsername}>@{username}</p>

        <p className={styles.successText}>Your profile feels just right.</p>
      </div>

      <div className={styles.actionRow}>
        <div className={styles.secondaryActions}>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={styles.secondaryButton}
          >
            Edit profile
          </button>
          <a
            href="https://noderhq.com/survey"
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
