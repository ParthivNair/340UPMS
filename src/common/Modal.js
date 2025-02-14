import React from "react";
import "./Modal.css"; // We'll define simple styles below

/**
 * Modal
 * @param {boolean} isOpen - whether the modal is visible
 * @param {Function} onClose - function to close the modal
 * @param {ReactNode} children - the form or content to display inside
 */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
