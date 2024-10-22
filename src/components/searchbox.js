import React, { useState, useEffect } from "react";

const SearchBox = ({ placeholder = "Search...", onSearch, buttonLabel = "Search" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center space-x-3 bg-custom-neutral-100 rounded-[12px] p-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-Small bg-white border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-custom-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-Small bg-custom-blue-500 text-white rounded-[8px] hover:bg-custom-blue-600 transition-all duration-200"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default SearchBox;
