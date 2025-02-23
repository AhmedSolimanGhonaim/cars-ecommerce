import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function ProtectedRoute({ children, adminOnly = false }) {
  const currentUser = useSelector((state) => state.auth);

  if (!currentUser) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" />;
  }

  if (adminOnly && currentUser.role !== "admin") {
    toast.error("Access denied. Admin privileges required.");
    return <Navigate to="/" />;
  }

  return children;
}
