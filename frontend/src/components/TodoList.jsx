import { useEffect } from "react";
import { useState } from "react";
import TabList from "./TabList";
import TodoItem from "./TodoItem";

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks", {
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) return data;

        throw new Error(data.error || "Failed to fetch tasks");
      })
      .then((data) => setTasks(data.tasks ?? []))
      .catch(() => setTasks([]));
  }, []);

  const itemsLeft = tasks.filter(item => !item.is_completed).length;

  return (
    <div 
      className="
        bg-navy-900 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] 
        light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)]
      "
    >
      {todoItems.map(item => (
        <TodoItem
          key={item.id}
          {...item}
        />
      ))}

      <div className="py-4 px-5 flex justify-between items-center tablet:p-6 tablet:grid tablet:grid-cols-3">
        <p>{itemsLeft} items left</p>

        <div className="hidden tablet:block">
          <TabList />
        </div>

        <button 
          type="button" 
          className="cursor-pointer transition-all tablet:justify-self-end hover:text-purple-300 light:hover:text-navy-850"
        >
          Clear Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList;