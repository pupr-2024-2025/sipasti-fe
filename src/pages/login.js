import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import PuprLogo from "../../public/images/pu-logo.svg";
import SipastiLogo from "../../public/images/sipasti-logo.svg";
import LoginImage from "../../public/images/login-asset.svg";

import Register from "./register";
import TextInput from "../components/input";
import Button from "../components/button";
import Modal from "../components/modal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = () => {
    console.log("Logging in with", email, password);
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    // Add actual login logic here
    if (email && password) {
      // Proceed with login, e.g., API call
      console.log("Logged in successfully");
      // Reset errors if login is successful
      setErrors({ email: "", password: "" });
    }
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true); // Open register modal
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false); // Close register modal
  };
  return (
    <div className="relative flex justify-center items-center h-screen gap-x-8 mx-8 py-8">
      {/* Container untuk form login */}
      <div className="flex flex-col justify-between h-full w-[900px] max-h-[960px] mx-8 py-8">
        {/* Card Header */}
        <div className="flex justify-between">
          <Image
            src={PuprLogo}
            alt="PUPR Logo"
            className="max-h-[54.37px] max-w-[156px]"
          />
          <Image
            src={SipastiLogo}
            alt="Sipasti Logo"
            className="max-h-[54px] max-w-[201px]"
          />
        </div>

        {/* Login card */}
        <div className="flex flex-col items-center justify-center mt-14">
          <div className="flex-auto self-center text-center">
            <h5 className="text-H5 text-emphasis-on_surface-high">
              Selamat Datang di Katalog HSPW!
            </h5>
            <p className="text-B1 text-emphasis-on_surface-medium w-[384px]">
              Katalog Informasi Harga Satuan Pokok Material Peralatan Tenaga
              Kerja Konstruksi per Wilayah
            </p>
          </div>

          {/* Input fields */}
          <div className="min-w-[336px] space-y-4">
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              state="border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <div className="space-y-1">
              <TextInput
                label="Password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                state="border"
              />{" "}
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}{" "}
              {/* Error message for password */}
              <Button variant="red_text" size="Extra_Small">
                Lupa Password
              </Button>
            </div>

            {/* Login Button */}
            <div className="space-y-2">
              <Button
                onClick={handleLogin}
                variant="solid_blue"
                size="Medium"
                className="w-full">
                Masuk
              </Button>
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t-2 border-emphasis-on_surface-small rounded-full"></div>
                <span className="flex-shrink mx-4 text-custom-neutral-500 text-Overline">
                  ATAU
                </span>
                <div className="flex-grow border-t-2 border-emphasis-on_surface-small rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={handleLogin}
                variant="outlined_yellow"
                size="Medium"
                className="w-full">
                Masuk menggunakan SSO
              </Button>
              <div className="gap-x-1 flex items-center justify-center">
                <p className="text-Small text-neutral-500 text-center">
                  Belum punya akun?
                </p>
                <div className="grid justify-end">
                  <Button
                    onClick={openRegisterModal}
                    variant="blue_text"
                    size="Extra_Small">
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-row justify-between items-center">
          <p className="text-B2 text-neutral-500">
            2024© SIPASTI V.3.0 All Reserved by PUPR
          </p>
          <div className="gap-x-2 flex items-center">
            <Button
              onClick={handleLogin}
              variant="blue_text"
              size="Extra_Small">
              Kebijakan Privasi
            </Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none">
              <circle cx="2" cy="2" r="2" fill="#B3B3B3" />
            </svg>
            <Button
              onClick={handleLogin}
              variant="blue_text"
              size="Extra_Small">
              Syarat dan Ketentuan
            </Button>
          </div>
        </div>
      </div>

      {/* Login Image */}
      <div className="max-h-[960px] max-w-[688px]">
        <Image src={LoginImage} alt="Login Image" className="object-cover" />
      </div>

      {/* Register Modal */}
      <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
        <Register onClose={closeRegisterModal} />
      </Modal>
    </div>
  );
};

export default Login;
