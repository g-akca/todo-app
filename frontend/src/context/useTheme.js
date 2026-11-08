import { createContext, useContext } from "react";

// Kept separate from ThemeProvider so the provider file only exports components (needed for Fast Refresh).
export const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
