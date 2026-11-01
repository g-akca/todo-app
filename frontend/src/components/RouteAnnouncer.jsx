import { useEffect } from "react";
import { useLocation } from "react-router";

const routeLabels = {
  "/": "Todo dashboard",
  "/login": "Log In",
  "/signup": "Sign Up",
};

function RouteAnnouncer() {
  const location = useLocation();

  useEffect(() => {
    const label = routeLabels[location.pathname] ?? "Page";
    const announcer = document.getElementById("route-announcer");

    if (announcer) {
      announcer.textContent = `${label} page`;
    }

    const focusTargetMap = {
      "/": "todo-dashboard",
      "/login": "login-heading",
      "/signup": "signup-heading",
    };

    const focusTargetId = focusTargetMap[location.pathname];
    const focusTarget = focusTargetId ? document.getElementById(focusTargetId) : null;

    if (focusTarget) {
      focusTarget.focus();
    }
  }, [location.pathname]);

  return (
    <div
      id="route-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}

export default RouteAnnouncer;
