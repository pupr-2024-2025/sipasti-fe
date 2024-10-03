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
        {/* Title */}
        <h5 className="text-H5 text-colors-emphasis-Light-On_Surface-High">Selamat Datang di Katalog HSPW</h5>

        {/* Subtitle */}
        <p className="text-B1 text-colors-emphasis-Light-On_Surface-Medium">
          Katalog Informasi Harga Satuan Pokok Material Peralatan Tenaga Kerja Konstruksi per Wilayah
        </p>

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
      </div>
    </div>
  );
};

export default Login;