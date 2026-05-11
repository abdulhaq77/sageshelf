import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  allowedRoles,
  redirectPath = "/auth",
  unauthorizedPath = "/unauthorized",
}) {
  const { accessToken, user } = useAuth();
  const isAuthenticated = accessToken !== null;

  // const location = useLocation();

  console.log(
    "protected route testing...",
    "access token",
    accessToken,
    "user",
    user,
  );

  // for guest
  if (!isAuthenticated) {
    <Navigate to={redirectPath} />;
  }
  // for buyer(registerd user)
  if (isAuthenticated && allowedRoles.includes("buyer")) {
    return <Outlet />;
  }

  // for seller
  if (isAuthenticated && allowedRoles.includes("seller")) {
    return <Outlet />;
  }

  // for admin
  if (isAuthenticated && allowedRoles.includes("admin")) {
    return <Outlet />;
  }

  return <Navigate to={unauthorizedPath} />;
}
