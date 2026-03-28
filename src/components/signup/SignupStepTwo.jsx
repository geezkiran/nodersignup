import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';

export function SignupStepTwo({
  formData,
  updateField,
  setStep,
  canContinue,
  usernameAvailability,
  isCheckingUsername,
}) {
  return (
    <form 
      className={styles.formStack}
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue) setStep(3);
      }}
    >
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

      <div>
        <SpotlightInput
          id="password"
          value={formData.password}
          onChange={(nextValue) => updateField('password', nextValue)}
          placeholder="Create password"
          type="password"
          autoComplete="new-password"
          name="password"
          required={true}
        />
      </div>

      <div className={styles.actionRow}>
        <button
          type="button"
          onClick={() => setStep(1)}
          className={styles.secondaryButton}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!canContinue}
          className={styles.primaryButton}
        >
          Continue
        </button>
      </div>
    </form>
  );
}


function RequirementItem({ met, label }) {
  return (
    <div className={`${styles.requirementItem} ${met ? styles.requirementMet : styles.requirementUnmet}`}>
      <svg
        className={styles.checkIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {met ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <circle cx="12" cy="12" r="10" />
        )}
      </svg>
      {label}
    </div>
  );
}
