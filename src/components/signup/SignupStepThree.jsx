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
  handleKeyDown,
}) {
  return (
    <div 
      className={styles.formStack}
      onKeyDown={(e) => handleKeyDown(e, canContinue, 4)}
    >
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
              <span className={styles.uploadPlaceholder}>
                <img src={pfp.src} alt="Profile" className={styles.uploadPlaceholderImg} />
              </span>
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
          name="username"
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
