import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Show modal on open
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Hide after transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null; // Don't render if not visible

  return (
    <div className={`modal-backdrop ${isOpen ? "fade-in" : "fade-out"}`}>
      <div className="modal-content">
        {children}
        <button onClick={onClose} className="modal-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
