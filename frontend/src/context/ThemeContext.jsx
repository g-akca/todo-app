import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  function toggleTheme() {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    const root = document.getElementById("root");

    switch (theme) {
      case "light":
        root.classList.add("light");
        localStorage.setItem("theme", "light");
        return;
      case "dark":
      default:
        root.classList.remove("light");
        localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}