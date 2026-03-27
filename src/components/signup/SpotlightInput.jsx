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
  labelMode = 'label',
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
    ) : (
      <label htmlFor={inputId} className={styles.fieldLabel}>
        {label}
      </label>
    );

  return (
    <>
      <div
        className={`${styles.spotlightField} ${
          isActive ? styles.spotlightFieldActive : ''
        }`}
      >
        {labelNode}
        <input
          id={inputId}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsActive(true)}
          placeholder={placeholder}
          className={styles.textInput}
        />
      </div>

      {isMounted &&
        isActive &&
        createPortal(
          <div
            className={styles.spotlightBackdrop}
            onMouseDown={handleBackdropPointerDown}
          >
            <div className={styles.spotlightPanel}>
              {label && (
                <label htmlFor={`${inputId}-overlay`} className={styles.spotlightLabel}>
                  
                </label>
              )}
              <input
                ref={overlayInputRef}
                id={`${inputId}-overlay`}
                type={type}
                value={value}
                autoComplete={autoComplete}
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`${styles.textInput} ${styles.spotlightInput}`}
                onBlur={() => setIsActive(false)}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
