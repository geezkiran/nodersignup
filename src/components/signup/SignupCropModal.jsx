import styles from './signup-crop-modal.module.css';

const HANDLE_TYPES = ['nw', 'ne', 'sw', 'se', 'n', 's', 'w', 'e'];

export function SignupCropModal({
  isOpen,
  photo,
  cropBox,
  cropGridOverlayStyle,
  cropFrameRef,
  beginCropInteraction,
  onCropPointerMove,
  endCropInteraction,
  onClose,
  onApply,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.caption}>Move and resize the square crop area</p>
        <div
          ref={cropFrameRef}
          className={styles.cropFrame}
          onPointerMove={onCropPointerMove}
          onPointerUp={endCropInteraction}
          onPointerCancel={endCropInteraction}
        >
          <img
            src={photo}
            alt="Crop preview"
            className={styles.cropImage}
            draggable={false}
          />

          <div className={styles.dimOverlay} />

          <div
            className={styles.cropBox}
            style={{
              left: cropBox.x,
              top: cropBox.y,
              width: cropBox.size,
              height: cropBox.size,
            }}
            onPointerDown={(event) => beginCropInteraction(event, 'move')}
          >
            <div className={styles.gridOverlay} style={cropGridOverlayStyle} />

            {HANDLE_TYPES.map((type) => (
              <span
                key={type}
                className={`${styles.handle} ${styles[`handle${type.toUpperCase()}`]}`}
                onPointerDown={(event) => beginCropInteraction(event, type)}
              />
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.secondaryButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onApply}
            className={`${styles.primaryButton} btn btn-primary`}
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}
