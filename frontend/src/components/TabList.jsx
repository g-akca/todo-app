import { useState } from "react";

const tabs = [
  {
    index: 0,
    name: "All"
  },
  {
    index: 1,
    name: "Active"
  },
  {
    index: 2,
    name: "Completed"
  },
];

function TabList() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex items-center gap-4 font-bold text-[14px] leading-base">
      {tabs.map(tab => (
        <button
          key={tab.index}
          type="button"
          onClick={() => setSelectedIndex(tab.index)}
          className={`cursor-pointer transition-all ${selectedIndex === tab.index ? "text-blue-500" : "hover:text-purple-300 light:hover:text-navy-850"}`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  )
}

export default TabList;