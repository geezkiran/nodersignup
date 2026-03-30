import styles from './signup-form.module.css';

export function SignupStepFour({ formData, setStep, isExistingUser }) {
  const username = (
    formData.profileUsername || formData.email.split('@')[0] || 'user'
  ).replace(/^@+/, '');

  if (isExistingUser) {
    return (
      <div className={styles.successStack}>
        <div className={styles.successCard}>
          <h2 className={styles.successUsername}>
            <span className={styles.successGreeting}>you're already signed up</span>
          </h2>

          <p className={styles.successText}>Thanks for being part of Noder.</p>
        </div>

        <div className={styles.actionRow}>
          <a
            href="https://noderhq.com"
            className={`${styles.secondaryButton} ${styles.returnHomeSecondary}`}
          >
            Return home
          </a>
          <div className={styles.secondaryActions}>
            
            <a
              href="https://nodersurvey.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.surveyButton}
            >
              Take a survey
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.successStack}>
      <div className={styles.successCard}>
        <h2 className={styles.successUsername}>
          <span className={styles.successGreeting}>hello, </span>
          <span className={styles.successUsernameText}>@{username}</span>
        </h2>

        <p className={styles.successText}>Your profile feels just right.</p>
      </div>

      <div className={styles.actionRow}>
        <a
          href="https://noderhq.com"
          className={`${styles.secondaryButton} ${styles.returnHomeSecondary}`}
        >
          Return home
        </a>
        <div className={styles.secondaryActions}>
          
          <a
            href="https://nodersurvey.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.surveyButton}
          >
            Take a survey
          </a>
        </div>
      </div>
    </div>
  );
}
