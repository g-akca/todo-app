import { createContext, useContext, useState, useMemo } from "react";
import { buildApiUrl } from "../config/api";

const TasksContext = createContext();

// Provides task state and API helpers to the rest of the app.
export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  // Load the current user's tasks from the backend.
  async function fetchTasks() {
    const res = await fetch(buildApiUrl("/tasks"), {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      setTasks([]);
      throw new Error(data.error || "Failed to fetch tasks");
    }

    setTasks(data.tasks ?? []);
    return data.tasks ?? [];
  }

  // Add a new task and update local state immediately.
  async function createTask(description) {
    const res = await fetch(buildApiUrl("/tasks"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ description }),
    });
    
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error || "Failed to create new task");

    setTasks((prevTasks) => [...prevTasks, data.newTask]);
    
    return data.newTask;
  }

  // Toggle a task's completion status and update local state immediately.
  async function updateTaskCompletion(id, isCompleted) {
    const res = await fetch(buildApiUrl(`/tasks/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isCompleted }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to update task");

    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === data.updatedTask.id ? data.updatedTask : task
    ));

    return data.updatedTask;
  }

  // Reorder two tasks in the UI.
  function reorderTasks(draggedTaskId, targetTaskId) {
    setTasks((prevTasks) => {
      const sourceIndex = prevTasks.findIndex((task) => task.id === draggedTaskId);
      const targetIndex = prevTasks.findIndex((task) => task.id === targetTaskId);

      if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) {
        return prevTasks;
      }

      const updatedTasks = [...prevTasks];
      const [movedTask] = updatedTasks.splice(sourceIndex, 1);
      updatedTasks.splice(targetIndex, 0, movedTask);

      return updatedTasks;
    });
  }

  // Remove a task from the current user's list and update local state immediately.
  async function deleteTask(id) {
    const res = await fetch(buildApiUrl(`/tasks/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete task");
    }
    
    setTasks((prevTasks) => prevTasks.filter((task) => 
      task.id !== id
    ));
  }
  
  // Remove all completed tasks from the current user's list and update local state immediately.
  async function deleteCompletedTasks() {
    const res = await fetch(buildApiUrl("/tasks/completed"), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete completed tasks");
    }

    setTasks((prevTasks) => prevTasks.filter((task) => 
      !task.is_completed
    ));
  }

  // Filter tasks based on selected tab, and update it whenever tasks or tab selection change.
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

  // Calculate the number of incomplete items left.
  const itemsLeft = useMemo(
    () => tasks.filter((task) => !task.is_completed).length,
    [tasks]
  );

  // Calculate the number of completed items.
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
        fetchTasks,
        createTask,
        updateTaskCompletion,
        reorderTasks,
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