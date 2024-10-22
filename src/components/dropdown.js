import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import colors from "../styles/colors";

const Dropdown = ({
  options,
  label,
  placeholder = "Pilih Opsi",
  onSelect,
  value,
  isRequired = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    const selectedObject = options.find(option => option.value === selectedOption);
    onSelect(selectedObject);

    if (isRequired && !selectedOption) {
      setError("This field is required");
    } else {
      setError("");
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      {label && (
        <label className="text-B2 text-emphasis-on_surface-high mb-1">
          {label}
          {isRequired && <span className="text-custom-red-500"> *</span>}
        </label>
      )}
      <select
        value={selectedValue}
        onChange={handleChange}
        className={`p-2 min-h-12 w-full border-[1.5px] rounded-[16px] transition-all duration-200 ease-in-out
          ${error ? "border-custom-red-500" : "border border-surface-light-outline"}
          focus:border-custom-blue-500 focus:outline-none`}
        required={isRequired}
      >
        <option value="" disabled>
          <span className="text-center text-gray-500">{placeholder}</span>
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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
