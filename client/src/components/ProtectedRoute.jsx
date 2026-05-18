import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/public/AuthContext.jsx";
import GlobalAppLoader from "./spinners/GlobalAppLoader.jsx";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  // 1. If we are currently logging out, show a loader and freeze the screen
  if (user?.role === "logging_out") {
    return <GlobalAppLoader />;
  }

  // 2. If they are a guest, they are logged out. Send them to login page.
  if (!user || user.role === "guest") {
    return <Navigate to="/auth" replace />;
  }

  // 3. If they are logged in and have the correct role, let them through
  if (allowedRoles.includes(user.role)) {
    return children ? children : <Outlet />;
  }

  // 4. Only show unauthorized if they are logged in with the WRONG role
  // (e.g., a buyer trying to view the seller dashboard)
  return <Navigate to="/unauthorized" replace />;
}
