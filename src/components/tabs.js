import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="">
      <div className="inline-flex space-x-2 bg-custom-neutral-100 rounded-[16px] p-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-3 text-Small rounded-[12px] transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeTab === tab.label
                ? "bg-custom-blue-500 text-emphasis-on_color-high" // Active tab styling with animation
                : "text-emphasis-on_surface-medium hover:bg-surface-light-overlay"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
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
