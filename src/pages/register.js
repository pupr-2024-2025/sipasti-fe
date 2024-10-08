import React, { useState } from "react";
import TextInput from "../components/input";
import Button from "../components/button";

const Register = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Registering with", email, password);
    onClose(); // Close modal after registration
  };

  return (
    <div>
      <h5 className="text-H5 text-emphasis-on_surface-high text-left">
        Buat Akun
      </h5>
      <p className="text-B1 text-emphasis-on_surface-medium text-left">
        Daftarkan diri anda segera ke katalog HSPW untuk mendapatkan akses mudah
        aman ke katalog, dan kemudahan administrasi daring.
      </p>
      <TextInput
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label="Password"
        placeholder="Masukkan Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        label="Konfirmasi Password"
        placeholder="Masukkan Konfirmasi Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
