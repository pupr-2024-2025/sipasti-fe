import React, { useState } from "react";
import Button from "./button";
import SearchBox from "./searchbox";

const Tabs = ({ tabs, button, filter }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    if (filter && filter.onFilter) {
      filter.onFilter(query);
    }
  };

  const handleAddData = () => {
    console.log("Adding data...");
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="inline-flex space-x-2 bg-custom-neutral-  100 rounded-[16px] p-2 h-[60px]">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-4 py-3 text-Small rounded-[12px] transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === tab.label
                  ? "bg-custom-blue-500 text-emphasis-on_color-high"
                  : "text-emphasis-on_surface-medium hover:bg-surface-light-overlay"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {filter && (
            <SearchBox
              placeholder="Cari..."
              onSearch={handleSearch}
              filterLabel={filter.label}
            />
          )}

          {button && (
            <Button
              variant={button.variant || "solid_blue"}
              size={button.size || "Medium"}
              onClick={button.onClick || handleAddData}>
              {button.label || "Label"}
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
            }`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
