import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
