import { signupStepContent } from '@/data/signupStepContent';
import styles from '@/app/signup-left-panel.module.css';

export function SignupHero({ step }) {
  const content = signupStepContent[step];

  return (
    <div className={`${styles.mobilePanel} relative`}>
      <p className="absolute bottom-4 right-4 text-xs uppercase tracking-[0.08em] text-[var(--text-secondary)]">
        Step {step} of 4
      </p>
      <h1 className={styles.mobileTitle}>{content.title}</h1>
      <p className={styles.mobileDescription}>{content.description}</p>

      <div className={styles.mobilePoints}>
        {content.leftPoints.map((point) => (
          <p key={point} className={styles.mobilePoint}>
            {point}
          </p>
        ))}
      </div>
    </div>
  );
}
