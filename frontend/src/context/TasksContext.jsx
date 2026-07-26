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

  async function createTask(description) {
    return fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ description }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) return data;

        throw new Error(data.error || "Failed to create new task");
      })
      .then((data) => setTasks((prevTasks) => [...prevTasks, data.newTask]))
      .catch((e) => console.error(e));
  }

  async function updateTaskCompletion(id, isCompleted) {
    return fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isCompleted }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) return data;

        throw new Error(data.error || "Failed to update task");
      })
      .then((data) => setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === data.updatedTask.id ? data.updatedTask : task
        )
      ))
      .catch((e) => console.error(e));
  }

  async function deleteTask(id) {
    return fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) return data;

        throw new Error(data.error || "Failed to delete task");
      })
      .then((data) => setTasks((prevTasks) =>
        prevTasks.filter((task) =>
          task.id !== id
        )
      ))
      .catch((e) => console.error(e));
  }

  return (
    <TasksContext.Provider value={{ tasks, createTask, updateTaskCompletion, deleteTask }}>
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