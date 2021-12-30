import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  element: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({ element: RouteElement }) => {
  const isLogged = localStorage.getItem("auth");

  console.log(isLogged);

  if (isLogged == "true") {
    return <RouteElement />;
  } else {
    return <Navigate to="/login" />;
  }
};
