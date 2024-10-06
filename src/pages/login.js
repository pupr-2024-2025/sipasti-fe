import { useState } from "react";
import Image from "next/image";

import PuprLogo from "../../public/images/pu-logo.svg";
import SipastiLogo from "../../public/images/sipasti-logo.svg";
import LoginImage from "../../public/images/login-asset.svg";

import InputField from "../components/Input";
import Button from "../components/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with", email, password);
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
          <div className="min-w-[336px] py-4 ">
            <InputField
              label="Email"
              placeholder="Enter your email"
              state="enabled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              state="enabled"
            />

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              variant="enabled"
              size="Medium"
              className="w-full">
              Masuk
            </Button>
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
            <p className="text-B2 text-blue-500 text-center">
              Kebijakan Privasi
            </p>
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
          </div>
        </div>
        {/* End of Footer */}
      </div>

      <div className="min-h-[960px] min-w-[688px]">
        <Image src={LoginImage} alt="Login Image" className="h-screen" />
      </div>
    </div>
  );
};

export default Login;
