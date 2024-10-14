import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4 bg-custom-neutral-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`py-2 px-4 text-B1 rounded-full transition-all cursor-pointer ${
              activeTab === tab.label
                ? "bg-surface-light-background text-emphasis-on_surface-high"
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
            className={`${activeTab === tab.label ? "block" : "hidden"}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
