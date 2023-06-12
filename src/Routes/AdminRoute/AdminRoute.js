import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAdmin from "../../hooks/useAdmin";
import Loading from "../../Pages/Shared/Loading/Loading";
import { AuthContext } from "../../contexts/UserProvider";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/signup" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
