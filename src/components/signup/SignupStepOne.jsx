import styles from './signup-form.module.css';
import { SpotlightInput } from './SpotlightInput';

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-5 w-5"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.37 1.23-3.2-.12-.3-.53-1.51.12-3.14 0 0 1.01-.32 3.3 1.22a11.4 11.4 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.65 1.63.24 2.84.12 3.14.77.83 1.23 1.89 1.23 3.2 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.09.81 2.2v3.26c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function SignupStepOne({
  formData,
  setStep,
  updateField,
  isValidEmail,
  otpDigits,
  otpInputRefs,
  handleOtpDigitChange,
  handleOtpKeyDown,
  handleOtpPaste,
  generatedOtp,
  canContinue,
  handleKeyDown,
}) {
  return (
    <div 
      className={styles.formStack}
      onKeyDown={(e) => handleKeyDown(e, canContinue, 2)}
    >
      <button
        type="button"
        onClick={() => setStep(2)}
        className={`${styles.socialButton} ${styles.socialButtonLight}`}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => setStep(2)}
        className={`${styles.socialButton} ${styles.socialButtonDark}`}
      >
        <GitHubIcon />
        Continue with GitHub
      </button>

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerText}>OR</span>
        <div className={styles.dividerLine} />
      </div>

      <div>
        <SpotlightInput
          id="email"
          label="Email"
          value={formData.email}
          onChange={(nextValue) => updateField('email', nextValue)}
          placeholder="Enter your email"
          type="email"
          autoComplete="email"
          name="email"
        />
      </div>

      {isValidEmail(formData.email) && (
        <div>
          <label htmlFor="otp" className={styles.fieldLabel}>
            Enter 4-digit OTP
          </label>
          <div className={styles.otpGrid} onPaste={handleOtpPaste}>
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                id={`otp-${index}`}
                ref={(element) => {
                  otpInputRefs.current[index] = element;
                }}
                inputMode="numeric"
                maxLength={1}
                value={otpDigits[index] || ''}
                onChange={(event) =>
                  handleOtpDigitChange(index, event.target.value)
                }
                onKeyDown={(event) => handleOtpKeyDown(index, event)}
                className={styles.otpInput}
              />
            ))}
          </div>
          <p className={styles.helperText}>Demo OTP: {generatedOtp}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setStep(2)}
        disabled={!canContinue}
        className={styles.primaryButton}
      >
        Continue
      </button>
    </div>
  );
}
