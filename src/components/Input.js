import React, { useState } from "react";
import colors from "../styles/colors";
import { EyeSlash, Eye, CloseCircle } from "iconsax-react"; // Import ikon CloseCircle

const TextInput = ({
  label,
  placeholder = "Lorem Ipsum",
  size = "Small",
  baseClasses = "p-3 min-h-12 w-full border-[1.5px]",
  variant = "border",
  value,
  onChange,
  disabled = false,
  className = "",
  type = "text",
  isRequired = false, // Prop untuk required
  errorMessage = "This field is required", // Default pesan error
  labelPosition = "top", // Atur posisi label
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(""); // State untuk pesan error

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const sizes = {
    ExtraSmall: "text-ExtraSmall px-2 py-1",
    Small: "text-Small px-3 py-2",
    Medium: "text-Medium px-4 py-3",
    Large: "text-Large px-5 py-4",
    ExtraLarge: "text-ExtraLarge px-6 py-5",
  };

  const variants = {
    border:
      "border border-surface-light-outline focus:outline-none focus:border-2 focus:border-custom-blue-500",
  };

  // Fungsi untuk validasi
  const handleBlur = () => {
    if (isRequired && !value) {
      setError(errorMessage); // Set pesan error jika input required tapi kosong
    } else {
      setError(""); // Hapus error jika valid
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    onChange(e); // Memanggil fungsi onChange yang diberikan melalui props

    if (error) {
      setError(""); // Reset error ketika pengguna mengetik lagi
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {labelPosition === "top" ? ( // Jika label di atas input
        <>
          {label && (
            <label
              className="text-B2 text-emphasis-on_surface-high w-[180px] block mb-1"
              style={{
                whiteSpace: "nowrap",
              }}>
              {label}
              {isRequired && (
                <span className="text-custom-red-500 ml-1">*</span>
              )}
            </label>
          )}
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : type}
              placeholder={placeholder}
              value={value}
              onChange={handleChange} // Menangani perubahan input
              onBlur={handleBlur} // Validasi saat kehilangan fokus
              disabled={disabled}
              className={`${sizes[size]} ${baseClasses} ${
                error
                  ? `border-custom-red-500 focus:border-custom-blue-500 border-2`
                  : variants[variant]
              } rounded-[16px] transition-all duration-200 ease-in-out h-12`} // Set height input
            />
            {type === "password" && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6 w-6">
                {isPasswordVisible ? (
                  <EyeSlash
                    color={colors.Emphasis.Light.On_Surface.Medium}
                    variant="Linear"
                    size={24}
                  />
                ) : (
                  <Eye
                    color={colors.Emphasis.Light.On_Surface.Medium}
                    variant="Linear"
                    size={24}
                  />
                )}
              </button>
            )}
          </div>
          {error && (
            <div className="flex items-center mt-1">
              <CloseCircle
                color={colors.Solid.Basic.Red[500]} // Ganti dengan warna yang sesuai
                variant="Linear"
                size={16}
                className="mr-1"
              />
              <span className="text-custom-red-500 text-ExtraSmall">
                {error}
              </span>
            </div>
          )}
        </>
      ) : (
        // Jika label di samping input
        <div className="flex flex-col">
          <div className="flex items-center space-x-12">
            {label && (
              <label
                className="text-B2 text-emphasis-on_surface-high h-8 min-w-[180px] mr-2" // Tambahkan min-w-[180px]
                style={{
                  whiteSpace: "nowrap",
                }}>
                {label}
                {isRequired && (
                  <span className="text-custom-red-500 ml-1">*</span>
                )}
              </label>
            )}
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange} // Menangani perubahan input
                onBlur={handleBlur} // Validasi saat kehilangan fokus
                disabled={disabled}
                className={`${sizes[size]} ${baseClasses} ${
                  error
                    ? `border-custom-red-500 focus:border-custom-blue-500 border-2`
                    : variants[variant]
                } rounded-[16px] transition-all duration-200 ease-in-out h-12`} // Set height input
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6 w-6">
                  {isPasswordVisible ? (
                    <EyeSlash
                      color={colors.Emphasis.Light.On_Surface.Medium}
                      variant="Linear"
                      size={24}
                    />
                  ) : (
                    <Eye
                      color={colors.Emphasis.Light.On_Surface.Medium}
                      variant="Linear"
                      size={24}
                    />
                  )}
                </button>
              )}
            </div>
          </div>
          {error && (
            <div className="flex items-center mt-1 ml-[236px]">
              {" "}
              {/* Adjust margin-left to match label width */}
              <CloseCircle
                color={colors.Solid.Basic.Red[500]} // Ganti dengan warna yang sesuai
                variant="Linear"
                size={16}
                className="mr-1"
              />
              <span className="text-custom-red-500 text-ExtraSmall">
                {error}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextInput;
