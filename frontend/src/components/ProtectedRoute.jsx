import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ allowedRole, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-purple-300">Loading...</div>
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
