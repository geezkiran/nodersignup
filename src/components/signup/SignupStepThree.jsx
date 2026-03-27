import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';

export function SignupStepThree({
  formData,
  photoPreviewStyle,
  updateField,
  handlePhotoUpload,
  openCropModal,
  setStep,
  canContinue,
}) {
  return (
    <div className={styles.formStack}>
      <div>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className={styles.hiddenInput}
        />
        <label htmlFor="photo" className={styles.uploadLabel}>
          <span className={styles.uploadFrame}>
            {formData.photo ? (
              <span className={styles.uploadPreviewFrame}>
                <span className={styles.uploadPreview} style={photoPreviewStyle} />
              </span>
            ) : (
              <span className={styles.uploadPlaceholder} />
            )}
            <span className={styles.uploadAdd}>+</span>
          </span>
        </label>

        {formData.photo && (
          <button
            type="button"
            onClick={openCropModal}
            className={styles.linkButton}
          >
            Edit crop
          </button>
        )}
      </div>

      <div>
        <SpotlightInput
          id="profileUsername"
          label="Username"
          value={formData.profileUsername}
          onChange={(nextValue) => updateField('profileUsername', nextValue)}
          placeholder="Username"
          autoComplete="username"
          labelMode="spacer"
        />
      </div>

      <div className={styles.actionRow}>
        <div /> {/* Spacer to push button to the right */}
        <button
          type="button"
          onClick={() => setStep(4)}
          disabled={!canContinue}
          className={styles.primaryButton}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
