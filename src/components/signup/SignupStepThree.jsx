import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';

export function SignupStepThree({
  formData,
  updateField,
  canContinue,
  usernameAvailability,
  isCheckingUsername,
  completeSignup,
  isSubmitting,
  error,
}) {
  return (
    <form
      className={`${styles.formStack} ${styles.profileForm}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue && !isSubmitting) completeSignup();
      }}
    >
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.usernameContainer}>
        <SpotlightInput
          id="profileUsername"
          value={formData.profileUsername}
          onChange={(nextValue) => updateField('profileUsername', nextValue)}
          placeholder="Username"
          autoComplete="username"
          name="username"
          required={true}
        >
          <div className={styles.availabilityWrapper}>
            {isCheckingUsername && (
              <span className={styles.checkingText}>Checking...</span>
            )}
            {!isCheckingUsername && usernameAvailability === 'taken' && (
              <span className={styles.takenText}>Username already taken</span>
            )}
            {!isCheckingUsername && usernameAvailability === 'available' && (
              <span className={styles.availableText}>Username available</span>
            )}
          </div>
        </SpotlightInput>
      </div>

      <div className={styles.inputsStack}>
        <SpotlightInput
          id="displayName"
          value={formData.displayName}
          onChange={(nextValue) => updateField('displayName', nextValue)}
          placeholder="What should we call you?"
          autoComplete="name"
          name="displayName"
        />
      </div>

      <div className={`${styles.actionRow} ${styles.actionRowRight} ${styles.profileActionRow}`}>
        <button
          type="submit"
          disabled={!canContinue || isSubmitting}
          className={styles.primaryButton}
        >
          {isSubmitting ? 'Finishing...' : 'Finish'}
        </button>
      </div>
    </form>
  );
}
