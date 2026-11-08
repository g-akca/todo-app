import { createContext, useContext } from "react";

// Kept separate from TasksProvider so the provider file only exports components (needed for Fast Refresh).
export const TasksContext = createContext();

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within TasksProvider");
  }

  return context;
}
