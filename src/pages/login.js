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

  const handleLogin = () => {
    console.log("Logging in with", email, password);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true); // Open register modal
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false); // Close register modal
  };
  return (
    <div className="flex justify-between items-center h-screen gap-x-8  mx-8 py-8">
      <div className="flex flex-col justify-between h-screen min-w-[656px] min-h-[960px] mx-8 py-8">
        {/* Card Header */}
        <div className="flex justify-between">
          <Image
            src={PuprLogo}
            alt="PUPR Logo"
            className="min-h-[54.37px] min-w-[156px]"
          />
          <Image
            src={SipastiLogo}
            alt="Sipasti Logo"
            className="min-h-[201px] min-w-[34px]"
          />
        </div>
        {/* End of Card Header */}

        {/* Login card */}
        <div className="pt-14 flex-col items-center justify-center flex-grow mx-28">
          {/* Login Title and Subtitle */}
          <div>
            <h5 className="text-H5 text-emphasis-on_surface-high text-center ">
              Selamat Datang di Katalog HSPW!
            </h5>
            <p className="text-B1 text-emphasis-on_surface-medium text-center">
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
            <div className="space-y-1">
              <TextInput
                label="Password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                state="border"
              />
              <Button variant="blue_text" size="Extra_Small" className="w-left">
                Lupa Password
              </Button>
            </div>

            {/* Login Button */}
            <div className="space-y-2" s>
              <Button
                onClick={handleLogin}
                variant="solid_blue"
                size="Medium"
                className="w-full">
                Masuk
              </Button>
              <div class="relative flex py-4 items-center">
                <div class="flex-grow border-t-2 border-emphasis-on_surface-small rounded-full"></div>
                <span class="flex-shrink mx-4 text-custom-neutral-500 text-Overline">
                  ATAU
                </span>
                <div class="flex-grow border-t-2 border-emphasis-on_surface-small rounded-full"></div>
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
                <div class="grid justify-end">
                  <Button
                    onClick={openRegisterModal}
                    variant="blue_text"
                    size="Extra_Small"
                    className="w-full">
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End of Login Card */}

        {/* Footer */}
        <div className="flex flex-wrap justify-between">
          {/* Credit */}
          <p className="text-B2 text-neutral-500 text-center">
            2024© SIPASTI V.3.0 All Reserved by PUPR
          </p>
          {/* Top Text Container */}
          <div className="gap-x-2 flex items-center">
            {/* Kebijakan Privasi */}
            {/* <p className="text-B2 text-blue-500 text-center">
              Kebijakan Privasi
            </p> */}
            <Button
              onClick={handleLogin}
              variant="blue_text"
              size="Extra_Small"
              className="w-center">
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
            {/* Syarat dan Ketentuan */}
            <p className="text-B2 text-blue-500 text-center">
              Syarat dan Ketentuan
            </p>
            <Button
              onClick={handleLogin}
              variant="blue_text"
              size="Extra_Small"
              className="w-center">
              Syarat dan Ketentuan
            </Button>
          </div>
        </div>
        {/* End of Footer */}
      </div>

      <div className="min-h-[960px] min-w-[688px]">
        <Image src={LoginImage} alt="Login Image" className="h-screen" />
      </div>
      {/* Register Modal */}
      <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
        <Register onClose={closeRegisterModal} />
      </Modal>
    </div>
  );
};

export default Login;
