import React, { useState } from "react";
import TextInput from "../components/input";
import Button from "../components/Button";
import FileInput from "../components/fileinput";
import IconCheckbox from "../components/checkbox";
import { CloseCircle } from "iconsax-react";
import Dropdown from "../components/Dropdown";

const Register = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [namalengkap, setNamaLengkap] = useState("");
  const [nik, setNIK] = useState("");
  const [nrp, setNRP] = useState("");
  const [balai, setBalai] = useState("");
  const [satuankerja, setSatuanKerja] = useState("");
  const [nomortelepon, setNomorTelepon] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("default");
  const [progress, setProgress] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [generalError, setGeneralError] = useState("");

  const labels = {
    namalengkap: "Nama Lengkap",
    nik: "NIK",
    email: "Email",
    satuankerja: "Satuan Kerja",
    nomortelepon: "Nomor Telepon",
    balai: "Balai",
    upload: "SK/Surat Penugasan",
  };

  const balaiOptions = [{ value: "1", label: "balai 007" }];
  const satuanKerjaOptions = [{ value: "1", label: "satker_007" }];

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleFileSelect = (files) => {
    const file = files[0];
    setSelectedFile(file);
    setUploadState("processing");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("done");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCancel = () => {
    setUploadState("default");
    setSelectedFile(null);
    setProgress(0);
  };

  const handleRegister = async () => {
    setErrorMessages({});
    setGeneralError("");

    const newErrorMessages = {};
    if (!namalengkap)
      newErrorMessages.namalengkap = "Nama Lengkap tidak boleh kosong";
    if (!nik) newErrorMessages.nik = "NIK tidak boleh kosong";
    if (!email) newErrorMessages.email = "Email tidak boleh kosong";
    if (!satuankerja)
      newErrorMessages.satuankerja = "Satuan Kerja tidak boleh kosong";
    if (!nomortelepon)
      newErrorMessages.nomortelepon = "Nomor Telepon tidak boleh kosong";
    if (!balai) newErrorMessages.balai = "Balai tidak boleh kosong";
    if (!selectedFile)
      newErrorMessages.upload = "Upload SK/Surat Penugasan tidak boleh kosong";

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      setGeneralError(
        "Anda belum mengisi kolom: " +
          Object.keys(newErrorMessages)
            .map((key) => labels[key])
            .join(", ")
      );
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("namalengkap", namalengkap);
    formData.append("nik", nik);
    formData.append("nrp", nrp);
    formData.append("balai", balai);
    formData.append("satuankerja", satuankerja);
    formData.append("nomortelepon", nomortelepon);
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://api-ecatalogue-staging.online/api/store-user",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Terjadi kesalahan saat registrasi."
        );
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      onClose();
    } catch (error) {
      setGeneralError(error.message);
    }
  };

  const handleSatuanKerjaSelect = (selectedOption) => {
    setSatuanKerja(selectedOption.value);
  };

  return (
    <div className="space-y-3 max-w-[90vw] max-h-[90vh] overflow-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-H5 text-emphasis-on_surface-high text-left">
          Buat Akun
        </h5>
        <button className="text-emphasis-on_surface-high" onClick={onClose}>
          <CloseCircle size="24" />
        </button>
      </div>

      <p className="text-B1 text-emphasis-on_surface-medium text-left">
        Daftarkan diri anda segera ke katalog HSPW untuk mendapatkan akses mudah
        aman ke katalog, dan kemudahan administrasi daring.
      </p>

      <div className="flex items-center justify-left gap-x-1">
        <p className="text-Small text-neutral-500">Sudah punya akun?</p>
        <Button variant="blue_text" size="Extra_Small">
          Masuk
        </Button>
      </div>

      <TextInput
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap"
        value={namalengkap}
        isRequired={true}
        errorMessage={errorMessages.namalengkap}
        onChange={(e) => setNamaLengkap(e.target.value)}
      />

      <div className="flex justify-center items-center">
        <div className="flex gap-x-8 w-full max-w-5xl">
          <div className="flex-1 space-y-4">
            <TextInput
              label="NIK"
              placeholder="Masukkan NIK"
              value={nik}
              isRequired={true}
              errorMessage={errorMessages.nik}
              onChange={(e) => setNIK(e.target.value)}
            />
            <TextInput
              label="NRP"
              placeholder="Masukkan NRP"
              value={nrp}
              onChange={(e) => setNRP(e.target.value)}
            />
            <Dropdown
              options={balaiOptions}
              label="Balai"
              placeholder="Pilih Balai"
              onSelect={(selectedOption) => setBalai(selectedOption.value)}
              isRequired={true}
              errorMessage={errorMessages.balai}
            />
          </div>

          <div className="flex-1 space-y-4">
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              value={email}
              isRequired={true}
              errorMessage={errorMessages.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Dropdown
              options={satuanKerjaOptions}
              label="Satuan Kerja"
              placeholder="Pilih Satuan Kerja"
              onSelect={handleSatuanKerjaSelect}
              isRequired={true}
              errorMessage={errorMessages.satuankerja}
            />
            <TextInput
              label="Nomor Telepon"
              placeholder="Masukkan Nomor Telepon"
              value={nomortelepon}
              isRequired={true}
              errorMessage={errorMessages.nomortelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
            />
          </div>
        </div>
      </div>

      <FileInput
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        state={uploadState}
        progress={progress}
        onCancel={handleCancel}
        required={true}
        Label="Upload SK/Surat Penugasan"
        HelperText="Format .JPG, .PNG dan maksimal 512Kb"
        errorMessage={errorMessages.upload}
      />

      <div>
        <IconCheckbox
          label="Saya setuju dengan syarat dan ketentuan berlaku."
          onChange={handleCheckboxChange}
        />
      </div>

      {generalError && (
        <div className="text-custom-red-500 text-sm mt-2">{generalError}</div>
      )}

      <div className="flex flex-row justify-end items-right space-x-4">
        <Button onClick={onClose} variant="outlined_yellow" size="Medium">
          Batal
        </Button>
        <Button
          onClick={handleRegister}
          variant="solid_blue"
          size="Medium"
          disabled={!isChecked}>
          Buat Akun
        </Button>
      </div>
    </div>
  );
};

export default Register;
