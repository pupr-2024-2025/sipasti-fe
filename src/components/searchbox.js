import React, { useState } from "react";
import { SearchNormal, Filter } from "iconsax-react";
import colors from "../styles/colors";

const SearchBox = ({
  placeholder = "Cari...",
  onSearch, // Fungsi yang dipanggil setiap kali input berubah
  withFilter = false, // Menentukan apakah varian kedua digunakan
  onFilterClick, // Fungsi untuk tombol filter
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Langsung panggil onSearch setiap kali input berubah
  };

  return (
    <div className="flex items-center space-x-3">
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

      {/* Tombol Filter untuk varian kedua */}
      {withFilter && (
        <button
          onClick={onFilterClick}
          className="flex items-center px-4 py-2 h-[46px] w-[119px] text-Medium  border-2 border-surface-light-outline text-emphasis-on_surface-medium rounded-[16px] hover:bg-custom-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-custom-blue-500">
          <Filter size="20" color={colors.Emphasis.Light.On_Surface.Medium} />
          <span className="text-Small font-medium">Filter</span>
        </button>
      )}
    </div>
  );
};

export default SearchBox;
