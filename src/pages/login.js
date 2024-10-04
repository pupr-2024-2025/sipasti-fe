import React, { useState } from 'react';
import Button from '../components/button'; // Assuming you have a button component
import colors from '../styles/colors'; // Import your color configuration

const InputField = ({ label, placeholder, state, value, onChange }) => {
  const baseClasses = "p-2 w-full border rounded-lg text-Small";
  let stateClasses = "";

  switch (state) {
    case "enabled":
      stateClasses = "border-gray-300";
      break;
    case "hovered":
      stateClasses = "border-blue-500";
      break;
    case "pressed":
      stateClasses = "border-blue-700";
      break;
    case "focused":
      stateClasses = "border-blue-500 ring-2 ring-blue-300";
      break;
    case "disabled":
      stateClasses = "border-gray-200 bg-gray-100 cursor-not-allowed";
      break;
    default:
      stateClasses = "border-gray-300";
  }

  return (
    <div className="mb-4">
      <label className="text-B2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className={`${baseClasses} ${stateClasses}`}
        value={value}
        onChange={onChange}
        disabled={state === "disabled"}
      />
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with', email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-poppins">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        {/*Logos*/}
        <div className="flex justify-between items-center mb-4 w-full">
          <img src="./images/pu-logo.svg" alt="PUPR Logo" className="w-20 h-20 mx-2" />
          <img src="/images/sipasti-logo.svg" alt="SIPASTI Logo" className="w-20 h-20 mx-2" />
        </div>
        
        {/* Title */}
        {/* <h5 className="text-H5 text-emphasis-surface-high text-center font-black">Selamat Datang di Katalog HSPW!</h5> */}
        <h5 className="text-H5 text-emphasis-surface-high text-center ">Selamat Datang di Katalog HSPW!</h5>

        {/* Subtitle */}
        <p className="text-B1 text-emphasis-surface-medium text-center">
          Katalog Informasi Harga Satuan Pokok Material Peralatan Tenaga Kerja Konstruksi per Wilayah
        </p>
        {/*Login Container*/}
        <div>
          {/* Input fields */}
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
            state="enabled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <Button onClick={handleLogin} variant="enabled" size="Medium" className="w-full">
            Masuk
          </Button>
          <div class="line"></div>
          <Button onClick={handleLogin} variant="enabled" size="Medium" className="w-full">
            Masuk dengan SSO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;