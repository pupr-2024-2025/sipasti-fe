import React, { useState } from "react";
import { SearchNormal } from "iconsax-react";
import { Filter } from "iconsax-react"; // Import ikon Filter
import colors from "../styles/colors";

const SearchBox = ({
  placeholder = "Cari...",
  onSearch,
  filterLabel = "Filter", // Label untuk tombol filter
  onFilter // Fungsi untuk menangani klik tombol filter
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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
          className="w-[336px] p-3 pl-12 text-Small bg-white border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-custom-blue-500" // Tambahkan pl-12 untuk padding kiri
        />
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2"> {/* Icon diposisikan di tengah */}
          <SearchNormal size="24" color={colors.Emphasis.Light.On_Surface.Medium} />
        </div>
      </div>

      {/* Tombol Filter */}
      <button
        onClick={() => onFilter(searchTerm)} // Panggil onFilter dengan searchTerm
        className="flex items-center px-7 py-2 h-full border border-surface-light-outline text-emphasis-on_surface-medium rounded-[15px] hover:bg-custom-blue-500 hover:text-white transition-all duration-200"
      >
        {filterLabel}
        <Filter size="20" color={colors.Emphasis.Light.On_Surface.Medium} className="ml-2" />
      </button>
    </div>
  );
};

export default SearchBox;
