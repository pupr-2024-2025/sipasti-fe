import React, { useState } from "react";
import colors from "../styles/colors";

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
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  // Define input states (enabled, focused, disabled)
  const variants = {
    border:
      "border border-surface-light-outline focus:outline-none focus:border-2 focus:border-custom-blue-500",
    // enabled:
    //   "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
    // focused:
    //   "border border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none",
    // disabled:
    //   "border border-gray-300 bg-gray-100 cursor-not-allowed text-gray-500",
  };

  return (
    <div className={`relative flex flex-col mb-4 ${className}`}>
      {label && (
        <label className="text-B2 text-emphasis-on_surface-high mb-1">
          {label}
        </label> // Label if provided
      )}
      <input
        type={isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${sizes[size]} ${baseClasses} ${
          disabled ? variants["disabled"] : variants[variant]
        } rounded-[16px] w-full transition-all duration-200 ease-in-out`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isPasswordVisible ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default TextInput;
