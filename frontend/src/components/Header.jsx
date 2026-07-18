import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import sunIcon from "/images/icon-sun.svg";
import moonIcon from "/images/icon-moon.svg";

function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

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

      <div className="flex items-center gap-4">
        {user && !isAuthPage && (
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-purple-300 tablet:text-[16px]">
              {user.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="
                px-3 py-1.5 rounded-[5px] bg-red-600 text-white text-[12px] font-semibold
                transition-all duration-200 hover:bg-red-500 active:scale-[0.98]
                tablet:text-[14px] tablet:px-4 tablet:py-2
              "
            >
              Logout
            </button>
          </div>
        )}

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
      </div>
    </header>
  )
}

export default Header;