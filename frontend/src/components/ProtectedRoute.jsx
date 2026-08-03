import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// Guards routes by redirecting users based on whether they are logged in and which role is allowed, and shows loading text.
export function ProtectedRoute({ allowedRole, children }) {
  const { user, loading } = useAuth();
  const [dotCount, setDotCount] = useState(3);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const intervalId = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(intervalId);
  }, [loading]);

  const loadingText = `Loading${".".repeat(dotCount)}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-purple-300 text-[14px] tablet:text-[16px] desktop:text-[18px]">{loadingText}</div>
      </div>
    );
  }
  
  if (allowedRole === "guest" && user) {
    return <Navigate to="/" replace />;
  }
  else if (allowedRole === "authenticated" && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
