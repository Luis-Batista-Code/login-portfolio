// src/components/Modal.tsx
import React, { useEffect, useRef } from 'react';
import './Modal.css';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Dá foco automático no botão quando o modal abrir
    buttonRef.current?.focus();
  }, []);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-message">
      <div className="modal">
        <p id="modal-message">{message}</p>
        <button className="button" onClick={onClose} ref={buttonRef} aria-label="Fechar modal">
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
