import { useState, useEffect } from "react";
import sunIcon from "/images/icon-sun.svg";
import moonIcon from "/images/icon-moon.svg";

function Header() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");

    if (darkMode) {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
    else {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center gap-4">
      <h1 
        className="
          uppercase text-white tracking-[10px] text-[26px] leading-base 
          font-bold mt-1.5 tablet:text-[40px] tablet:tracking-[14px]
        "
      >
        Todo
      </h1>

      <button 
        type="button" 
        onClick={() => setDarkMode(prev => !prev)} 
        className="cursor-pointer transition-all duration-200 hover:scale-[1.15] active:scale-[1.03]"
      >
        <img 
          src={darkMode ? sunIcon : moonIcon} 
          alt={darkMode ? "Sun icon" : "Moon icon"} 
          className="w-5 aspect-square tablet:w-6.5" 
        />
      </button>
    </header>
  )
}

export default Header;