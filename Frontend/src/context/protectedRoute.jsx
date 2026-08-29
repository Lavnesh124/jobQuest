// ProtectedRoute.js
import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
  // TODO: Re-enable auth when building is done
  // const { isAuthenticated, loading } = useAuth();
  // if (loading) {
  //   return <motion.div>Loading...</motion.div>;
  // }
  // return isAuthenticated ? children : <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
