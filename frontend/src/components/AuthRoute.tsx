import React from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default AuthRoute;
