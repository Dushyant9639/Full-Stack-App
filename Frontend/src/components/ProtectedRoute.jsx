import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  let token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;
  return element;
}

export default ProtectedRoute;
