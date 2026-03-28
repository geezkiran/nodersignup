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
  isSendingOtp,
  isVerifyingOtp,
  otpSent,
  sendOtp,
  canContinue,
  handleKeyDown,
  signInWithProvider,
  error,
  countdown,
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  return (
    <div 
      className={styles.formStack}
      onKeyDown={(e) => handleKeyDown(e, canContinue, 2)}
    >
      <button
        type="button"
        onClick={() => signInWithProvider('google')}
        className={`${styles.socialButton} ${styles.socialButtonLight}`}
      >
        <GoogleIcon />
        Continue with Google
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
        {!isValidEmail(formData.email) && formData.email.length > 0 && (
          <p className={styles.errorText}>Please enter a valid email address</p>
        )}
      </div>

      {isValidEmail(formData.email) && (
        <div className={styles.otpContainer}>
          <div className={styles.otpHeader}>
            <label htmlFor="otp" className={styles.fieldLabel}>
              {otpSent ? 'Enter 6-digit code' : 'Verification'}
            </label>
            {!otpSent && (
              <button
                type="button"
                onClick={sendOtp}
                disabled={isSendingOtp}
                className={styles.sendOtpButton}
              >
                {isSendingOtp ? 'Sending...' : 'Send Code'}
              </button>
            )}
            {otpSent && (
              <div className={styles.otpActionRow}>
                {countdown > 0 && (
                  <span className={styles.countdownText}>{formatTime(countdown)}</span>
                )}
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={isSendingOtp || countdown > 0}
                  className={styles.resendButton}
                >
                  {isSendingOtp ? 'Sending...' : 'Resend'}
                </button>
              </div>
            )}
          </div>

          {otpSent && (
            <div className={styles.otpInputWrapper}>
              <div className={styles.otpGrid} onPaste={handleOtpPaste}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
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
                    disabled={isVerifyingOtp}
                  />
                ))}
              </div>
              {isVerifyingOtp && (
                <p className={styles.verifyingText}>Verifying code...</p>
              )}
              {error && (
                <p className={styles.errorText}>{error}</p>
              )}
            </div>
          )}
          
          {!otpSent && !isSendingOtp && (
            <p className={styles.helperText}>We'll send a 6-digit security code to your email.</p>
          )}
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
