import { useTasks } from "../context/TasksContext";

const tabs = [
  {
    key: "all",
    name: "All"
  },
  {
    key: "active",
    name: "Active"
  },
  {
    key: "completed",
    name: "Completed"
  },
];

function TabList() {
  const { selectedTab, setSelectedTab } = useTasks();

  return (
    <div className="flex items-center gap-4 font-bold text-[14px] leading-base">
      {tabs.map(tab => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setSelectedTab(tab.key)}
          className={`cursor-pointer transition-all ${selectedTab === tab.key ? "text-blue-500" : "hover:text-purple-300 light:hover:text-navy-850"}`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  )
}

export default TabList;