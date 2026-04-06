import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ requiredRole, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} />;
  return children;
}