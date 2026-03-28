import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';

export function SignupStepTwo({
  formData,
  updateField,
  setStep,
  canContinue,
}) {
  return (
    <form 
      className={styles.formStack}
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue) setStep(3);
      }}
    >
      <div>
        <SpotlightInput
          id="displayName"
          value={formData.displayName}
          onChange={(nextValue) => updateField('displayName', nextValue)}
          placeholder="What should we call you?"
          autoComplete="name"
          name="displayName"
        />
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
