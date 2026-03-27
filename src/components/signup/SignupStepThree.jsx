import styles from './signup-form.module.css';

export function SignupStepThree({ formData, photoPreviewStyle, setStep }) {
  const username = (
    formData.profileUsername || formData.email.split('@')[0] || 'user'
  ).replace(/^@+/, '');

  const displayName =
    formData.profileUsername || formData.email.split('@')[0];

  return (
    <div className={styles.successStack}>
      <div className={styles.successCard}>
        <div className={styles.successAvatarWrap}>
          <div className={styles.successAvatar} style={photoPreviewStyle} />
        </div>

        <p className={styles.successUsername}>@{username}</p>
        
        <p className={styles.successText}>The profile feels just right.</p>
      </div>

      <div className={styles.actionRow}>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={styles.secondaryButton}
        >
          Edit profile
        </button>
        <a href="/" className={`${styles.returnHome} btn btn-primary`}>
          Return home
        </a>
      </div>
    </div>
  );
}
