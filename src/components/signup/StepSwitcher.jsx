import styles from './step-switcher.module.css';

export function StepSwitcher({ step, setStep }) {
  return (
    <div className={styles.switcher}>
      <div className={styles.grid}>
        {[1, 2, 3, 4].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStep(item)}
            className={`${styles.stepButton} ${
              step === item ? styles.stepButtonActive : ''
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className={styles.mobileLabel}>Step {step} of 4</p>
    </div>
  );
}
