import { Navigate } from "react-router-dom";

function AdminProtectedRoute({
  children
}) {

  const token =
    localStorage.getItem(
      "adminToken"
    );

  return token
    ? children
    : <Navigate to="/admin-login" />;
}

export default AdminProtectedRoute;