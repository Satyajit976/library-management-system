import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("studentToken");

  return token
    ? children
    : <Navigate to="/student-login" />;
}

export default ProtectedRoute;