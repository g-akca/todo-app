import { createContext, useContext } from "react";

// Kept separate from AuthProvider so the provider file only exports components (needed for Fast Refresh).
export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
