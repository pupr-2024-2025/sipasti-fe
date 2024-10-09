import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-light-overlay bg-opacity-100 z-40"
        onClick={onClose}></div>

      {/* Modal content */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-surface-light-background p-8 rounded-[16px] shadow-lg relative max-w-[784px] w-full">
          <button
            className="absolute top-2 right-2 text-gray-600"
            onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
