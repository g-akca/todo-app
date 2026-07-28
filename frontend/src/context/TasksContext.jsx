import { createContext, useContext, useState, useEffect, useMemo } from "react";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  
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
        if (res.ok) return;

        const data = await res.json();
        throw new Error(data.error || "Failed to delete task");
      })
      .then(() => setTasks((prevTasks) =>
        prevTasks.filter((task) =>
          task.id !== id
        )
      ))
      .catch((e) => console.error(e));
  }
  
  async function deleteCompletedTasks() {
    return fetch(`http://localhost:3000/tasks/completed`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) return;

        const data = await res.json();
        throw new Error(data.error || "Failed to delete completed tasks");
      })
      .then(() => setTasks((prevTasks) =>
        prevTasks.filter((task) => !task.is_completed)
      ))
      .catch((e) => console.error(e));
  }

  const filteredTasks = useMemo(() => {
    switch (selectedTab) {
      case "active":
        return tasks.filter((task) => !task.is_completed);
      case "completed":
        return tasks.filter((task) => task.is_completed);
      case "all":
      default:
        return tasks;
    }
  }, [tasks, selectedTab]);

  const itemsLeft = useMemo(
    () => tasks.filter((task) => !task.is_completed).length,
    [tasks]
  );

  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.is_completed).length,
    [tasks]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        selectedTab,
        setSelectedTab,
        filteredTasks,
        itemsLeft,
        completedTasksCount,
        createTask,
        updateTaskCompletion,
        deleteTask,
        deleteCompletedTasks,
      }}
    >
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