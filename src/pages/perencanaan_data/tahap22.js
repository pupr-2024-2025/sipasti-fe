import React, { useState } from "react";
import FileInput from "../../components/FileInput";

const MyForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
    // Reset error message jika file dipilih
    setFileError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setFileError("File wajib dipilih.");
      return;
    }

    // Proses pengiriman data atau lainnya
    console.log("Files ready to submit:", selectedFiles);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        onFileSelect={handleFileSelect}
        buttonText="Upload File"
        required={true}
        errorMessage={fileError} // Mengirimkan pesan kesalahan
      />
      <button type="submit" className="btn-submit">
        Kirim
      </button>
      {/* Tambahkan elemen lain yang diperlukan */}
    </form>
  );
};

export default MyForm;
