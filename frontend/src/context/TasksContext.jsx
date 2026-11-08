import { useCallback, useState, useMemo } from "react";
import { buildApiUrl } from "../config/api";
import { TasksContext } from "./useTasks";

// Provides task state and API helpers to the rest of the app.
export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [announcement, setAnnouncement] = useState({ id: 0, message: "" });

  // Queue a status message for the shared screen reader live region.
  // The incrementing id lets the region re-announce repeated messages.
  function announce(message) {
    setAnnouncement((prev) => ({ id: prev.id + 1, message }));
  }

  // Load the current user's tasks from the backend.
  // Memoized so consumers can safely list it as an effect dependency.
  const fetchTasks = useCallback(async () => {
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
  }, []);

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
    announce(`${data.newTask.description} added`);

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
    announce(
      `${data.updatedTask.description} marked as ${data.updatedTask.is_completed ? "complete" : "incomplete"}`
    );

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
    const deletedTask = tasks.find((task) => task.id === id);

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
    announce(`${deletedTask?.description ?? "Task"} deleted`);
  }
  
  // Remove all completed tasks from the current user's list and update local state immediately.
  async function deleteCompletedTasks() {
    const completedCount = tasks.filter((task) => task.is_completed).length;

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
    announce(`${completedCount} completed ${completedCount === 1 ? "task" : "tasks"} cleared`);
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
        announcement,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}