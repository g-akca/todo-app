import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";
import { useNavigate } from "react-router";
import sunIcon from "/images/icon-sun.svg";
import moonIcon from "/images/icon-moon.svg";

function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    setLogoutError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setLogoutError(error.message || "Unable to log out right now. Please try again.");
    }
  };

  return (
    <header className="flex justify-between items-center gap-3 tablet:gap-4">
      <h1 
        className="
          uppercase text-white tracking-[10px] text-[26px] leading-base 
          font-bold mt-1.5 tablet:text-[40px] tablet:tracking-[14px]
        "
      >
        Todo
      </h1>

      <div className="flex flex-col items-end gap-3 tablet:flex-row tablet:items-center tablet:gap-4">
        {user && (
          <span className="max-sm:max-w-30 max-w-50 truncate text-[13px] text-purple-300 tablet:text-[16px]">
            {user.email}
          </span>
        )}

        <div className="shrink-0 flex flex-row-reverse items-center gap-3 tablet:flex-row tablet:gap-4">
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              aria-describedby={logoutError ? "logout-error" : undefined}
              className="
                px-3 py-1.5 rounded-[5px] bg-red-600 text-white text-[12px] font-semibold
                transition-all duration-200 cursor-pointer hover:bg-red-500 active:scale-[0.98]
                tablet:text-[14px] tablet:px-3.5 tablet:py-2
              "
            >
              Logout
            </button>
          )}

          <button 
            type="button" 
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="cursor-pointer transition-all duration-200 hover:scale-[1.15] active:scale-[1.03]"
          >
            <img 
              src={theme === "dark" ? sunIcon : moonIcon} 
              alt=""
              aria-hidden="true"
              className="w-5 aspect-square tablet:w-6.5" 
            />
          </button>
        </div>

        {logoutError && (
          <p
            id="logout-error"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className="text-[12px] text-red-300 tablet:text-[13px]"
          >
            {logoutError}
          </p>
        )}
      </div>
    </header>
  )
}

export default Header;