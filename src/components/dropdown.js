import React, { useState } from "react";

import Select from "react-select";

const Dropdown = ({ options, placeholder = "Pilih Opsi", onSelect, value }) => {
  const [selectedValue, setSelectedValue] = useState(value || null);

  // Map options to format required by react-select
  const formattedOptions = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onSelect(selectedOption);
  };

  return (
    <div className="relative flex flex-col w-full">
      <Select
        value={selectedValue}
        onChange={handleChange}
        options={formattedOptions}
        placeholder={placeholder}
        classNamePrefix="select" // Prefix for styling
        isClearable={false} // Disable clearing for a required field
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "48px", // Match min height
            transition: "all 200ms ease-in-out", // Transition effect
            borderRadius: "16px",
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
    </div>
  );
};

export default Dropdown;
