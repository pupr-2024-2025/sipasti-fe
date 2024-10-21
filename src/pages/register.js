import React, { useState } from "react";
import TextInput from "../components/input";
import Button from "../components/button";
import FileInput from "../components/fileinput";
import IconCheckbox from "../components/checkbox";
import { CloseCircle } from "iconsax-react";
import Dropdown from "../components/dropdown";

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

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

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

  const handleRegister = () => {
    console.log(
      "Registering with",
      email,
      namalengkap,
      nik,
      nrp,
      balai,
      satuankerja,
      nomortelepon
    );
    onClose();
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
        errorMessage="Nama Lengkap tidak boleh kosong"
        onChange={(e) => setNamaLengkap(e.target.value)}
      />

      <div className="flex justify-center items-center">
        <div className="flex gap-x-8 w-full max-w-5xl">
          {/* Kolom Kiri */}
          <div className="flex-1 space-y-4">
            <TextInput
              label="NIK"
              placeholder="Masukkan NIK"
              value={nik}
              isRequired={true}
              errorMessage="NIK tidak boleh kosong"
              onChange={(e) => setNIK(e.target.value)}
            />
            <TextInput
              label="NRP"
              placeholder="Masukkan NRP"
              value={nrp}
              onChange={(e) => setNRP(e.target.value)}
            />
            <Dropdown
              options={options}
              label="Balai"
              placeholder="Pilih Balai"
              onSelect={(value) => console.log(value)}
              isRequired={true}
            />
          </div>

          {/* Kolom Kanan */}
          <div className="flex-1 space-y-4">
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              value={email}
              isRequired={true}
              errorMessage="Email tidak boleh kosong"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Dropdown
              options={options}
              label="Satuan Kerja"
              placeholder="Pilih Satuan Kerja"
              onSelect={(value) => console.log(value)}
              isRequired={true}
            />
            <TextInput
              label="Nomor Telepon"
              placeholder="Masukkan Nomor Telepon"
              value={nomortelepon}
              isRequired={true}
              errorMessage="Nomor telepon tidak boleh kosong"
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
        Label="Upload SK/Surat Penugasan"
        HelperText="Format .JPG, .PNG dan maksimal 512Kb"
      />

      <div>
        <IconCheckbox
          label="Saya setuju dengan syarat dan ketentuan berlaku."
          onChange={handleCheckboxChange}
        />
      </div>

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
