import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';

export function SignupStepTwo({
  formData,
  updateField,
  setStep,
  canContinue,
  handleKeyDown,
}) {
  return (
    <div 
      className={styles.formStack}
      onKeyDown={(e) => handleKeyDown(e, canContinue, 3)}
    >
      <div>
        <SpotlightInput
          id="password"
          label="Minimum 6 characters"
          value={formData.password}
          onChange={(nextValue) => updateField('password', nextValue)}
          placeholder="Create password"
          type="password"
          autoComplete="new-password"
          name="password"
          labelMode="spacer"
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
