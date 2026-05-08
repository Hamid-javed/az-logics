import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLocked, isLoading } = useAuth();
  const location = useLocation();

  // ✅ Wait for iframe auth check to complete before deciding
  if (isLoading) return null;

  if (!isAuthenticated || isLocked) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;