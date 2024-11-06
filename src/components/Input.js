import React, { useState } from "react";
import colors from "../styles/colors";
import { CloseCircle } from "iconsax-react";

const TextInput = ({
  label,
  placeholder = "Enter values, separated by commas",
  size = "Small",
  baseClasses = "p-3 min-h-12 w-full border-[1.5px]",
  variant = "border",
  value,
  onChange,
  disabledActive = false,
  className = "",
  type = "text",
  isRequired = false,
  errorMessage = "This field is required",
  labelPosition = "top",
}) => {
  const [error, setError] = useState("");

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
    disabledActive:
      "bg-white border border-surface-light-outline cursor-not-allowed text-emphasis-on_surface-high",
    multipleInput:
      "border border-surface-light-outline focus:outline-none focus:border-2 focus:border-custom-blue-500", // For multi-input
  };

  const handleBlur = () => {
    if (isRequired) {
      if (variant === "multipleInput") {
        // For multiple input, ensure all values in the array are non-empty
        const hasEmptyValue = value.some((val) => val.trim() === "");
        setError(hasEmptyValue ? errorMessage : "");
      } else {
        // For single input, check if value is empty
        setError(
          !value || (typeof value === "string" && value.trim() === "")
            ? errorMessage
            : ""
        );
      }
    }
  };

  const handleChange = (e) => {
    if (disabledActive) return;

    const newValue = e?.target?.value; // Access value only if target is defined
    if (newValue !== undefined) {
      onChange(newValue);
    }

    if (error) {
      setError("");
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {labelPosition === "top" ? (
        <>
          {label && (
            <label
              className="text-B2 text-emphasis-on_surface-high w-[180px] block mb-1"
              style={{ whiteSpace: "nowrap" }}>
              {label}
              {isRequired && (
                <span className="text-custom-red-500 ml-1">*</span>
              )}
            </label>
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={variant === "multipleInput" ? value.join(", ") : value} // Join for display if multipleInput
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabledActive}
            className={`${sizes[size]} ${baseClasses} ${
              disabledActive
                ? variants.disabledActive
                : error
                ? `border-custom-red-500 focus:border-custom-blue-500 border-2`
                : variants[variant]
            } rounded-[16px] transition-all duration-200 ease-in-out h-12`}
          />
          {error && (
            <div className="flex items-center mt-1">
              <CloseCircle
                color={colors.Solid.Basic.Red[500]}
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
        <div className="flex flex-col">
          <div className="flex items-center space-x-12">
            {label && (
              <label
                className="text-B2 text-emphasis-on_surface-high h-8 min-w-[180px] mr-2"
                style={{ whiteSpace: "nowrap" }}>
                {label}
                {isRequired && (
                  <span className="text-custom-red-500 ml-1">*</span>
                )}
              </label>
            )}
            <div className="relative w-full">
              <input
                type={type}
                placeholder={placeholder}
                value={variant === "multipleInput" ? value.join(", ") : value} // Join for display if multipleInput
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabledActive}
                className={`${sizes[size]} ${baseClasses} ${
                  disabledActive
                    ? variants.disabledActive
                    : error
                    ? `border-custom-red-500 focus:border-custom-blue-500 border-2`
                    : variants[variant]
                } rounded-[16px] transition-all duration-200 ease-in-out h-12`}
              />
            </div>
          </div>
          {error && (
            <div className="flex items-center mt-1 ml-[236px]">
              <CloseCircle
                color={colors.Solid.Basic.Red[500]}
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
