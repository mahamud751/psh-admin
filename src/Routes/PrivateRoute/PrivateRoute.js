import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/UserProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return children;
  } else {
    return <Navigate to="/signup" replace />;
  }
  // if (loading) {
  //   return <progress className="progress w-56"></progress>; // Or any other loading indicator
  // }

  // if (user || token) {
  //   return children;
  // }

  // return <Navigate to="/signup" state={{ from: location }} replace />;
};

export default PrivateRoute;
