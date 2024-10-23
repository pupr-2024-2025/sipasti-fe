import React, { useState } from "react";
import Button from "./button";
import SearchBox from "./searchbox"; // Pastikan import ini sesuai
import { Filter } from "iconsax-react"; // Pastikan untuk mengimpor ikon Filter jika diperlukan

const Tabs = ({ tabs, button }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  // Fungsi untuk menangani pencarian
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Tambahkan logika pencarian di sini
  };

  // Fungsi untuk menangani filter
  const handleFilter = (query) => {
    console.log("Filtering with term:", query);
    // Tambahkan logika filter di sini
  };

  // Fungsi untuk menangani tambah data
  const handleAddData = () => {
    console.log("Adding data...");
    // Tambahkan logika untuk menambah data
  };

  return (
    <div>
      <div className="flex justify-between">
        {/* Tabs Navigation */}
        <div className="inline-flex space-x-2 bg-custom-neutral-100 rounded-[16px] p-2 h-[60px]">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-4 py-3 text-Small rounded-[12px] transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === tab.label
                  ? "bg-custom-blue-500 text-emphasis-on_color-high"
                  : "text-emphasis-on_surface-medium hover:bg-surface-light-overlay"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box dan Button Gabungan */}
        <div className="flex items-center space-x-3"> {/* Menambahkan space antara SearchBox dan Button */}
          <SearchBox
            placeholder="Cari..."
            onSearch={handleSearch}
            filterLabel="Filter"
            onFilter={handleFilter} // Fungsi untuk filter
          />
          
          {/* Button Tambah Data */}
          {button && (
            <Button
              variant={button.variant || "solid_blue"} // Menambahkan fallback jika button tidak ada
              size={button.size || "Medium"}
              onClick={button.onClick || handleAddData} // Menggunakan handleAddData jika button.onClick tidak ada
            >
              {button.label || "Tambah Data"}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="w-full">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`transition-opacity duration-300 ${
              activeTab === tab.label ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
