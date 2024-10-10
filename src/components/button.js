import React from "react";
import colors from "../styles/colors";

const Button = ({
  children,
  size = "Medium",
  variant = "solid_blue",
  onClick,
  disabled = false,
  className = "",
  iconLeft = null,
  iconRight = null,
}) => {
  const sizes = {
    ExtraSmall: "text-ExtraSmall",
    Small: "px-5 py-1.5 text-Small rounded-[12px]",
    Medium: "py-3 text-Medium rounded-[16px]",
    Large: "px-5 py-2.5 text-Large",
    ExtraLarge: "px-6 py-3 text-ExtraLarge",
  };

  const variants = {
    solid_blue:
      "bg-custom-blue-500 shadow-md text-emphasis-on_color-high hover:bg-custom-blue-600 active:bg-custom-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700",
    solid_yellow:
      "bg-custom-yellow-500 shadow-md text-emphasis-on_color-high hover:bg-custom-yellow-600 active:bg-custom-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700",
    outlined_blue:
      "bg-custom-blue-500 shadow-md text-emphasis-on_color-high hover:bg-custom-blue-600 active:bg-custom-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700",
    outlined_yellow:
      "ring-2 ring-custom-yellow-500 shadow-md text-custom-yellow-500 hover:bg-custom-yellow-600/10 active:bg-custom-yellow-700/1 focus:outline-none focus:ring-2 focus:ring-yellow-700",
    blue_text:
      "text-custom-blue-500 hover:text-custom-blue-600 active:text-custom-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700",
    red_text:
      "text-custom-red-500 hover:text-custom-red-600 active:text-custom-red-700 focus:outline-none focus:ring-2 focus:ring-red-700",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${sizes[size]} ${
        disabled ? variants["disabled"] : variants[variant]
      } 
      flex justify-center items-center gap-2 transition-all duration-200 ease-in-out ${className}`} // Added flex & gap for icon alignment
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}{" "}
      {/* Left icon if provided */}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}{" "}
      {/* Right icon if provided */}
    </button>
  );
};

export default Button;
