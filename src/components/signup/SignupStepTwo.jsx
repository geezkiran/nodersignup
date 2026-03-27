import styles from './signup-form.module.css';

export function SignupStepTwo({
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
        <div className={styles.fieldSpacer} aria-hidden="true" />
        <input
          id="profileUsername"
          value={formData.profileUsername}
          onChange={(event) =>
            updateField('profileUsername', event.target.value)
          }
          placeholder="Username"
          className={styles.textInput}
        />
      </div>

      <div>
        <label htmlFor="password" className={styles.fieldLabel}>
          Create password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(event) => updateField('password', event.target.value)}
          placeholder="minimum 6 characters"
          className={styles.textInput}
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
          Finish
        </button>
      </div>
    </div>
  );
}
