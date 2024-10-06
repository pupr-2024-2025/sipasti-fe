import React from "react";
import colors from "../styles/colors";

const Button = ({
  children,
  size = "Medium", // Default size sesuai dengan custom font di tailwind.config.js
  variant = "enabled", // Default state
  onClick,
  disabled = false,
  className = "",
}) => {
  // Define size class from Tailwind custom configuration
  const sizes = {
    ExtraSmall: "px-2 py-1 text-ExtraSmall",
    Small: "px-3 py-1.5 text-Small",
    Medium: "py-3 text-Medium",
    Large: "px-5 py-2.5 text-Large",
    ExtraLarge: "px-6 py-3 text-ExtraLarge",
  };

  // Define button states (enabled, hovered, pressed, focused, disabled)
  const variants = {
    default:
      "bg-schemesColors-light-primary text-schemesColors-light-onPrimary hover:bg-schemesColors-light-primary/90",
    enabled: `bg-custom-blue-500 text-emphasis-on_color-high`, // Set color directly from colors.js
    disabled: `bg-gray-400 text-emphasis-on_color-high opacity-60 cursor-not-allowed`, // Disable button styling
    hovered: `bg-custom-blue-600 text-emphasis-on_color-high`, // Use Tailwind for hover
    pressed: `bg-custom-blue-700 text-emphasis-on_color-high`,
    focused:
      "focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50",
    outlined: "border border-blue-950 text-emphasis-on_color-high",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${sizes[size]} ${
        disabled ? variants["disabled"] : variants[variant]
      } 
      rounded-[16px] shadow-md transition-all duration-200 ease-in-out ${className}`} // Set rounded-[16px] here
    >
      {children}
    </button>
  );
};

export default Button;
