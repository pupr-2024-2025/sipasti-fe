import React, { useState } from "react";
import colors from "../styles/colors"; // Import your colors
import { CloseCircle, ArrowDown2 } from "iconsax-react"; // Import your chevron icon here

const Dropdown = ({
  options,
  label,
  placeholder = "Pilih Opsi", // Default placeholder text
  onSelect,
  value,
  isRequired = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false); // State for tracking focus

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsFocused(true); // Set focused when the dropdown is toggled
  };

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    onSelect(option.value);
    setIsOpen(false);
    setError(""); // Clear error when a selection is made
    setIsFocused(false); // Clear focus state when an option is selected
  };

  const handleBlur = () => {
    if (isRequired && !selectedValue) {
      setError("This field is required");
    } else {
      setError("");
    }
    setIsFocused(false); // Clear focus state when blurred
  };

  const sizes = {
    ExtraSmall: "text-ExtraSmall px-2 py-1",
    Small: "text-Small px-3 py-2", // Use Small size
    Medium: "text-Medium px-4 py-3",
    Large: "text-Large px-5 py-4",
    ExtraLarge: "text-ExtraLarge px-6 py-5",
  };

  return (
    <div className="relative flex flex-col">
      {label && (
        <label className="text-B2 text-emphasis-on_surface-high mb-1">
          {label}
          {isRequired && <span className="text-custom-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          onBlur={handleBlur}
          className={`p-3 min-h-12 w-full border-[1.5px] rounded-[16px] transition-all duration-200 ease-in-out ${
            error
              ? "border-custom-red-500"
              : isFocused // Change border color when focused
              ? "border-custom-blue-500 text-emphasis-on_surface-medium" // Blue border and medium text when focused
              : "border border-surface-light-outline"
          } ${sizes.Small} text-left flex justify-between items-center`} // Flexbox for alignment
        >
          <span
            className={`${
              isFocused
                ? "text-emphasis-on_surface-medium"
                : "text-emphasis-on_surface-small"
            }`}>
            {selectedValue || placeholder}{" "}
            {/* Use placeholder for empty state */}
          </span>
          <ArrowDown2 size={16} color={colors.Surface.On_Surface_Small} />{" "}
          {/* Chevron icon */}
        </button>

        {isOpen && (
          <div
            className="absolute z-10 bg-surface-light-background shadow-lg rounded-md mt-1 w-full p-2"
            style={{ padding: "8px" }}>
            {/* Set padding for the container */}
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="hover:bg-custom-blue-50 hover:text-custom-blue-500 cursor-pointer text-left text-emphasis-on_surface-high text-Small rounded-md mb-1" // Set hover styles and margin bottom
                style={{ padding: "8px 12px", borderRadius: "4px" }} // Padding and corner radius for each option
              >
                {option.label} {/* Render option label */}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-1">
          <CloseCircle
            color={colors.Solid.Basic.Red[500]} // Change to your desired error color
            variant="Linear"
            size={16}
            className="mr-1"
          />
          <span className="text-custom-red-500 text-ExtraSmall">{error}</span>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
