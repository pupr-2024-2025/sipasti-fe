import React from "react";
import colors from "../styles/colors";

const Button = ({
  children,
  size = "Medium", // Default size sesuai dengan custom font di tailwind.config.js
  variant = "solid_blue", // Default state
  onClick,
  disabled = false,
  className = "",
}) => {
  // Define size class from Tailwind custom configuration
  const sizes = {
    ExtraSmall: "text-ExtraSmall",
    Small: "px-3 py-1.5 text-Small",
    Medium: "py-3 text-Medium",
    Large: "px-5 py-2.5 text-Large",
    ExtraLarge: "px-6 py-3 text-ExtraLarge",
  };

  // Define button states (enabled, hovered, pressed, focused, disabled)
  const variants = {
    solid_blue:
      "bg-custom-blue-500 shadow-md text-emphasis-on_color-high hover:bg-custom-blue-600 text-emphasis-on_color-high active:bg-custom-blue-700 text-emphasis-on_color-high focus:outline-none focus:ring-2 focus:ring-blue-700",
    solid_yellow:
      "bg-custom-yellow-500 shadow-md text-emphasis-on_color-high hover:bg-custom-yellow-600 text-emphasis-on_color-high active:bg-custom-yellow-700 text-emphasis-on_color-high focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-opacity-50",
    outlined_blue:
      "bg-custom-blue-500 shadow-md text-emphasis-on_color-high hover:bg-custom-blue-600 text-emphasis-on_color-high active:bg-custom-blue-700 text-emphasis-on_color-high focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50",
    outlined_yellow:
      "ring-2 ring-custom-yellow-500 shadow-md text-custom-yellow-500 hover:bg-custom-yellow-600/10 text-custom-yellow-600 active:bg-custom-yellow-700/1 text-custom-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700",
    blue_text:
      "text-custom-blue-500 hover: text-custom-blue-600 active: text-custom-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50",
    red_text:
      "text-custom-red-500 hover: text-custom-red-600 active: text-custom-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${sizes[size]} ${
        disabled ? variants["disabled"] : variants[variant]
      } 
      rounded-[16px]  transition-all duration-200 ease-in-out ${className}`} // Set rounded-[16px] here
    >
      {children}
    </button>
  );
};

export default Button;
