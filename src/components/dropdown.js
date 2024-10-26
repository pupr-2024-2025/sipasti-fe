import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import Select from "react-select"; // Import react-select
import colors from "../styles/colors";

const Dropdown = ({
  options,
  label,
  placeholder = "Pilih Opsi",
  onSelect,
  value,
  isRequired = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || null);
  const [error, setError] = useState("");

  // Map options to format required by react-select
  const formattedOptions = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onSelect(selectedOption);

    if (isRequired && !selectedOption) {
      setError("This field is required");
    } else {
      setError("");
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      {" "}
      {/* Added p-6 here */}
      {label && (
        <label className="text-B2 text-emphasis-on_surface-high mb-1">
          {label}
          {isRequired && <span className="text-custom-red-500"> *</span>}
        </label>
      )}
      <Select
        value={selectedValue}
        onChange={handleChange}
        options={formattedOptions}
        placeholder={placeholder}
        className={`react-select ${
          error
            ? "border-custom-red-500"
            : "border border-surface-light-outline"
        }`}
        classNamePrefix="select" // Prefix for styling
        isClearable={false} // Disable clearing for a required field
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "48px", // Match min height
            borderWidth: "1.5px", // Border width
            borderRadius: "16px", // Border radius
            transition: "all 200ms ease-in-out", // Transition effect
            borderColor: error ? colors.Solid.Basic.Red[500] : base.borderColor,
            boxShadow: "none",
            "&:hover": {
              borderColor: error
                ? colors.Solid.Basic.Red[500]
                : colors.Solid.Basic.Blue[500], // Change color on hover
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: "gray", // Placeholder color
            textAlign: "left", // Center align placeholder
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999, // Ensure dropdown is on top
            position: "absolute", // Set position to absolute
            top: "100%", // Position the menu below the control
            left: 0, // Align to the left
            width: "100%", // Match the width of the control
          }),
          option: (base) => ({
            ...base,
            textAlign: "left", // Align text in options
          }),
        }}
      />
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
