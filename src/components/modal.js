import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Memulai transisi ketika modal dibuka
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false); // Menyembunyikan modal setelah transisi keluar selesai
      }, 500); // Durasi tutup 500ms
      return () => clearTimeout(timer); // Membersihkan timer jika komponen unmount
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-surface-light-overlay bg-opacity-100 z-40 transition-opacity ${
          isOpen ? "duration-[800ms]" : "duration-[500ms]"
        } ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}></div>

      {/* Modal content */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div
          className={`bg-surface-light-background p-4 rounded-[16px] shadow-lg relative max-w-[784px] w-full transition-all ${
            isOpen ? "duration-[800ms]" : "duration-[500ms]"
          } transform ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }`}>
          <div style={{ padding: "4px 0" }}>
            {/* Menambahkan padding di dalam modal */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
