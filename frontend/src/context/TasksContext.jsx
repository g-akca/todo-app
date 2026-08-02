import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { buildApiUrl } from "../config/api";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [tasksFetchError, setTasksFetchError] = useState(null);
  
  useEffect(() => {
    fetch(buildApiUrl("/tasks"), {
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) return data;

        throw new Error(data.error);
      })
      .then((data) => {
        setTasks(data.tasks ?? []);
        setTasksFetchError(null);
      })
      .catch((e) => {
        setTasks([]);
        setTasksFetchError(e || "Failed to fetch tasks");
      });
  }, []);

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

  async function deleteTask(id) {
    const res = await fetch(buildApiUrl(`/tasks/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to delete task");
    
    setTasks((prevTasks) => prevTasks.filter((task) => 
      task.id !== id
    ));
  }
  
  async function deleteCompletedTasks() {
    const res = await fetch(buildApiUrl("/tasks/completed"), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to delete completed tasks");

    setTasks((prevTasks) => prevTasks.filter((task) => 
      !task.is_completed
    ));
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