import { createContext, useContext, useState, useEffect } from "react";

const TasksContext = createContext();

export function TasksProvider({ children }) {
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

  return (
    <TasksContext.Provider value={{ tasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within TasksProvider");
  }

  return context;
}