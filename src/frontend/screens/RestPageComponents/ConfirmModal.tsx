import React from 'react';
import CoreStyles from '../CoreComponents/CoreStyles.tsx';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = 'Confirmation',
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  const styles = CoreStyles().confirmModalStyles

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttons}>
          <button onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} style={styles.confirmButton}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
