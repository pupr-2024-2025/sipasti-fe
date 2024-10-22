import React, { useState } from "react";
import Button from "./button";
import SearchBox from "./searchbox";

const Tabs = ({ tabs, button }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };
  
  return (
    <div className="">
      <div className="flex justify-between">
        {/* Tabs Navigation */}
        <div className="inline-flex space-x-2 bg-custom-neutral-100 rounded-[16px] p-2">
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
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Example</h1>
      <SearchBox
        placeholder="Search for something..."
        onSearch={handleSearch}
        buttonLabel="Go"
      />
    </div>

        {button && (
          <Button
            variant={button.variant || "solid_blue"}
            size={button.size || "Medium"}
            onClick={button.onClick}
          >
            {button.label || "Button"}
          </Button>
        )}
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
