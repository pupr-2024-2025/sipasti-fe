import React, { useState } from "react";
import TextInput from "../components/input";
import Button from "../components/button";

const Register = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [namalengkap, setNamaLengkap] = useState("");
  const [nik, setNIK] = useState("");
  const [nrp, setNRP] = useState("");
  const [balai, setBalai] = useState("");
  const [satuankerja, setSatuanKerja] = useState("");
  const [nomortelepon, setNomorTelepon] = useState("");

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
