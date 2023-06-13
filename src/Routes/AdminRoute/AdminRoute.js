import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAdmin from "../../hooks/useAdmin";
import { AuthContext } from "../../contexts/UserProvider";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { location } = useLocation();

  if (user && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
