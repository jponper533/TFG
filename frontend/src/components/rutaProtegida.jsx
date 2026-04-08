import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // verifica si hay token

  if (!token) {
    // no está logueado → redirige al login
    return <Navigate to="/" replace />;
  }

  // está logueado → permite acceder
  return children;
}

export default ProtectedRoute;