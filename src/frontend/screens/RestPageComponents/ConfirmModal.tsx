import React from 'react';

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

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center' as 'center',
  },
  title: {
    margin: '0 0 16px',
  },
  message: {
    margin: '0 0 24px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  confirmButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ConfirmModal;
