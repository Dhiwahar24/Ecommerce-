import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "./auth";

const ProtectedRoute = ({ children }) => {
  return isAdminLoggedIn() ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;
