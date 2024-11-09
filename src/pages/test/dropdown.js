import React, { useEffect, useState } from "react";
import Select from "react-select";

const Dropdown = ({ options, placeholder = "Pilih Opsi", onSelect }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // Set isBrowser to true when the component is mounted on the client side
    setIsBrowser(typeof window !== "undefined");
  }, []);

  const formattedOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Select
      options={formattedOptions}
      onChange={(selectedOption) => onSelect(selectedOption)}
      placeholder={placeholder}
      styles={{
        menu: (base) => ({
          ...base,
          zIndex: 1000,
        }),
      }}
      menuPosition="fixed" // Ensure menu is displayed as a fixed position
      // Only set menuPortalTarget if in the browser
      menuPortalTarget={isBrowser ? document.body : null}
    />
  );
};

export default Dropdown;
