import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';
import pfp from '@/app/assets/pfp.png';

export function SignupStepThree({
  formData,
  photoPreviewStyle,
  updateField,
  handlePhotoUpload,
  openCropModal,
  setStep,
  canContinue,
  usernameAvailability,
  isCheckingUsername,
  completeSignup,
  removePhoto,
  isSubmitting,
  error,
}) {
  return (
    <form
      className={styles.formStack}
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue && !isSubmitting) completeSignup();
      }}
    >
      {error && <p className={styles.errorText}>{error}</p>}
      <div>
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={handlePhotoUpload}
        />
        <label htmlFor="photo-upload" className={styles.uploadLabel}>
          <div className={styles.uploadFrame}>
            {formData.photo ? (
              <div className={styles.uploadPreviewFrame}>
                <div
                  className={styles.uploadPreview}
                  style={photoPreviewStyle}
                  onClick={(e) => {
                    e.preventDefault();
                    openCropModal();
                  }}
                />
              </div>
            ) : (
              <div className={styles.uploadPlaceholder}>
                <img src={pfp.src} alt="Profile Placeholder" className={styles.uploadPlaceholderImg} />
                <div className={styles.uploadAdd}>+</div>
              </div>
            )}
          </div>
        </label>
        <div className={styles.photoActions}>
          <button type="button" onClick={openCropModal} className={styles.linkButton}>
            {formData.photo ? 'Edit photo' : 'Add profile photo'}
          </button>
          {formData.photo && (
            <>
              <span className={styles.actionDivider}>•</span>
              <button type="button" onClick={removePhoto} className={`${styles.linkButton} ${styles.removeButton}`}>
                Remove
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.inputsStack}>
        <div className={styles.usernameContainer}>
          <SpotlightInput
            id="profileUsername"
            value={formData.profileUsername}
            onChange={(nextValue) => updateField('profileUsername', nextValue)}
            placeholder="Username"
            autoComplete="username"
            name="username"
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
      </div>

      <div className={styles.actionRow}>
        <div /> {/* Spacer to push button to the right */}
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
