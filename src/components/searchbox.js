import React, { useState } from "react";
import { SearchNormal } from "iconsax-react";
import colors from "../styles/colors";

const SearchBox = ({
  placeholder = "Cari...",
  onSearch, // Fungsi yang dipanggil setiap kali input berubah
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Langsung panggil onSearch setiap kali input berubah
  };

  return (
    <div className="flex items-center rounded-[12px] p-2 space-x-3">
      {/* Input dengan Search Icon */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-[336px] p-3 pl-12 text-Small bg-white border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-custom-blue-500"
        />
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <SearchNormal
            size="24"
            color={colors.Emphasis.Light.On_Surface.Medium}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
