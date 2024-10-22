import React, { useState } from "react";
import colors from "../styles/colors";
import { CloseCircle, ArrowDown2 } from "iconsax-react";

const Dropdown = ({
  options,
  label,
  placeholder = "Pilih Opsi",
  onSelect,
  value,
  isRequired = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setIsFocused(true);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    onSelect(option);
    setIsOpen(false);
    setError("");
    setIsFocused(false);
  };

  const handleBlur = () => {
    if (isRequired && !selectedValue) {
      setError("This field is required");
    } else {
      setError("");
    }
    setIsFocused(false);
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
              : isFocused
              ? "border-custom-blue-500 text-emphasis-on_surface-medium"
              : "border border-surface-light-outline"
          } text-left flex justify-between items-center`}
        >
          <span
            className={`${
              isFocused
                ? "text-emphasis-on_surface-medium"
                : "text-emphasis-on_surface-small"
            }`}
          >
            {selectedValue || placeholder}
          </span>
          <ArrowDown2 size={16} color={colors.Surface.On_Surface_Small} />
        </button>

        {isOpen && (
          <div
            className="z-30 bg-surface-light-background shadow-lg rounded-md mt-1 w-full"
            style={{ top: "100%", left: 0 }} // Positioning
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="hover:bg-custom-blue-50 hover:text-custom-blue-500 cursor-pointer text-left text-emphasis-on_surface-high text-Small rounded-md mb-1"
                style={{ padding: "8px 12px" }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-1">
          <CloseCircle
            color={colors.Solid.Basic.Red[500]}
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
