import React, { useState } from "react";
import TextInput from "../components/input";
import Button from "../components/button";
import { Paperclip } from "iconsax-react";
import colors from "../styles/colors";
import FileInput from "../components/fileinput"; //

const handleSubmit = () => {
  // Handle form submission
  console.log("Selected Files:", selectedFiles);
  // You can add your form submission logic here

  // Optionally clear the selected files after submission
  setSelectedFiles([]);
  // Close the modal or perform other actions as needed
  onClose();
};
const Register = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [namalengkap, setNamaLengkap] = useState("");
  const [nik, setNIK] = useState("");
  const [nrp, setNRP] = useState("");
  const [balai, setBalai] = useState("");
  const [satuankerja, setSatuanKerja] = useState("");
  const [nomortelepon, setNomorTelepon] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadState, setUploadState] = useState("default");
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
    console.log("Selected files:", files);
    setUploadState("processing");
    //   setTimeout(() => {
    //     setUploadState("done");
    //   }, 2000);
    // };
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("done"); // Change state to done after processing
          return 100;
        }
        return prev + 10; // Increment progress by 10%
      });
    }, 200); // Simulate progress every 200 ms
  };

  const handleCancel = () => {
    // Handle cancellation logic here
    setUploadState("default"); // Reset to default state
    setProgress(0); // Reset progress
    setSelectedFiles(null); // Reset selected files
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
    onClose(); // Close modal after registration
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
            <div className="w-full">
              <TextInput
                label="NIK"
                placeholder="Masukkan NIK"
                value={nik}
                onChange={(e) => setNIK(e.target.value)}
              />
            </div>
            <div className="w-full">
              <TextInput
                label="NRP"
                placeholder="Masukkan NRP"
                value={nrp}
                onChange={(e) => setNRP(e.target.value)}
              />
            </div>
            <div className="w-full">
              <TextInput
                label="Balai"
                placeholder="Masukkan Balai"
                value={balai}
                onChange={(e) => setBalai(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4">
            <div className="w-full">
              <TextInput
                label="Email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <TextInput
                label="Satuan Kerja"
                placeholder="Pilih Satuan Kerja"
                value={satuankerja}
                onChange={(e) => setSatuanKerja(e.target.value)}
              />
            </div>
            <div className="w-full">
              <TextInput
                label="Nomor Telepon"
                placeholder="Masukkan Nomor Telepon"
                value={nomortelepon}
                onChange={(e) => setNomorTelepon(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <FileInput
        Label="Upload SK/Surat Penugasan"
        onFileSelect={handleFileSelect}
        buttonText="Pilih Berkas"
        accept=".jpg,.jpeg,.png"
        HelperText="Format .JPG, .PNG dan maksimal 512Kb."
        state={uploadState}
        progress={progress}
        onCancel={handleCancel}
      />

      <Button
        onClick={handleRegister}
        variant="solid_blue"
        size="Medium"
        className="w-full">
        Daftar
      </Button>
    </div>
  );
};

export default Register;
