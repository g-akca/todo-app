import { useState } from "react";

function TabList() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex items-center gap-4 font-bold text-[14px] leading-base">
      <p>All</p>
      <p>Active</p>
      <p>Completed</p>
    </div>
  )
}

export default TabList;