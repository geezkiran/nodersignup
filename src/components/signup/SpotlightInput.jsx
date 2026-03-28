'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './signup-form.module.css';

export function SpotlightInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  name,
  labelMode = 'label',
  required,
  children,
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const overlayInputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      overlayInputRef.current?.focus();
      overlayInputRef.current?.select();
    });

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
      window.cancelAnimationFrame(frame);
    };
  }, [isActive]);

  const handleBackdropPointerDown = (event) => {
    if (event.target === event.currentTarget) {
      setIsActive(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsActive(false);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      setIsActive(false);
    }
  };

  const labelNode =
    labelMode === 'spacer' ? (
      <div className={styles.fieldSpacer} aria-hidden="true" />
    ) : label ? (
      <label htmlFor={inputId} className={styles.fieldLabel}>
        {label}
      </label>
    ) : null;

  const requiredStar = required && (
    <span className={styles.requiredStar} aria-hidden="true">
      *
    </span>
  );

  return (
    <>
      <div
        className={`${styles.spotlightField} ${
          isActive ? styles.spotlightFieldActive : ''
        }`}
      >
        {labelNode}
        <div className={styles.inputWrapper}>
          <input
            id={inputId}
            type={type}
            value={value}
            autoComplete={autoComplete}
            name={name}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => setIsActive(true)}
            placeholder={placeholder}
            className={styles.textInput}
          />
          {requiredStar}
        </div>
        {children}
      </div>

      {isMounted &&
        isActive &&
        createPortal(
          <div
            className={styles.spotlightBackdrop}
            onMouseDown={handleBackdropPointerDown}
          >
            <div className={styles.spotlightPanel}>
              <div className={styles.inputWrapper}>
                <div className={styles.spotlightFloatingLabel}>
                  {placeholder}
                </div>
                <input
                  ref={overlayInputRef}
                  id={`${inputId}-overlay`}
                  type={type}
                  value={value}
                  autoComplete={autoComplete}
                  name={name}
                  onChange={(event) => onChange(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder=""
                  className={`${styles.textInput} ${styles.spotlightInput}`}
                  onBlur={() => setIsActive(false)}
                />
                {requiredStar}
              </div>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
