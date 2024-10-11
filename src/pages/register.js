import React, { useState } from "react";
import TextInput from "../components/input";
import Button from "../components/button";
import FileInput from "../components/fileinput";
import IconCheckbox from "../components/checkbox";

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
  const [isChecked, setIsChecked] = useState(false); // State untuk checkbox

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev); // Toggle isChecked
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

  return (
    <div className="space-y-3">
      <h5 className="text-H5 text-emphasis-on_surface-high text-left">
        Buat Akun
      </h5>
      <p className="text-B1 text-emphasis-on_surface-medium text-left">
        Daftarkan diri anda segera ke katalog HSPW untuk mendapatkan akses mudah
        aman ke katalog, dan kemudahan administrasi daring.
      </p>
      <div className="gap-x-1 flex">
        <p className="text-Small text-neutral-500 text-center">
          Sudah punya akun?
        </p>
        <div className="grid justify-end">
          <Button variant="blue_text" size="Extra_Small">
            Masuk
          </Button>
        </div>
      </div>

      <TextInput
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap"
        value={namalengkap}
        onChange={(e) => setNamaLengkap(e.target.value)}
      />

      <div className="flex justify-center items-center">
        <div className="flex gap-x-8 w-full max-w-5xl">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            <TextInput
              label="NIK"
              placeholder="Masukkan NIK"
              value={nik}
              onChange={(e) => setNIK(e.target.value)}
            />
            <TextInput
              label="NRP"
              placeholder="Masukkan NRP"
              value={nrp}
              onChange={(e) => setNRP(e.target.value)}
            />
            <TextInput
              label="Balai"
              placeholder="Masukkan Balai"
              value={balai}
              onChange={(e) => setBalai(e.target.value)}
            />
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4">
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="Satuan Kerja"
              placeholder="Pilih Satuan Kerja"
              value={satuankerja}
              onChange={(e) => setSatuanKerja(e.target.value)}
            />
            <TextInput
              label="Nomor Telepon"
              placeholder="Masukkan Nomor Telepon"
              value={nomortelepon}
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
          label="Saya setuju dengan syarat dan ketentuan berlaku."
          onChange={handleCheckboxChange}
        />
      </div>

      <div className="flex flex-row justify-end items-right space-x-4">
        <Button
          onClick={handleRegister}
          variant="outlined_yellow"
          size="Medium">
          Batal
        </Button>

        <Button
          onClick={handleRegister}
          variant="solid_blue"
          size="Medium"
          disabled={!isChecked} // Disable tombol jika checkbox tidak dicentang
        >
          Buat Akun
        </Button>
      </div>
    </div>
  );
};

export default Register;
