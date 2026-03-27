import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';

export function SignupStepTwo({
  formData,
  updateField,
  setStep,
  canContinue,
  passwordRequirements,
}) {
  const { hasMinLength, hasLower, hasUpper, hasNumber, hasSymbol } = passwordRequirements;

  return (
    <div className={styles.formStack}>
      <div>
        <SpotlightInput
          id="password"
          label="Create your password"
          value={formData.password}
          onChange={(nextValue) => updateField('password', nextValue)}
          placeholder="Create password"
          type="password"
          autoComplete="new-password"
          name="password"
          labelMode="spacer"
        >
          <div className={styles.requirementsList}>
            <RequirementItem met={hasUpper} label="Uppercase letter" />
            <RequirementItem met={hasLower} label="Lowercase letter" />
            <RequirementItem met={hasSymbol} label="A symbol" />
            <RequirementItem met={hasNumber} label="A digit" />
            <RequirementItem met={hasMinLength} label="At least 6 characters" />
          </div>
        </SpotlightInput>
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
          type="button"
          onClick={() => setStep(3)}
          disabled={!canContinue}
          className={styles.primaryButton}
        >
          Continue
        </button>
      </div>
    </div>
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
