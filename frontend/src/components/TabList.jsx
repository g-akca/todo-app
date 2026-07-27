import { useState } from "react";
import { useTasks } from "../context/TasksContext";

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
  const { selectedTabIndex, setSelectedTabIndex } = useTasks();

  return (
    <div className="flex items-center gap-4 font-bold text-[14px] leading-base">
      {tabs.map(tab => (
        <button
          key={tab.index}
          type="button"
          onClick={() => setSelectedTabIndex(tab.index)}
          className={`cursor-pointer transition-all ${selectedTabIndex === tab.index ? "text-blue-500" : "hover:text-purple-300 light:hover:text-navy-850"}`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  )
}

export default TabList;