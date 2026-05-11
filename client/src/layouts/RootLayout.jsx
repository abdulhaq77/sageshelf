import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { AuthProvider } from "../context/AuthContext";
import { UIProvider } from "../context/UIContext.jsx";

export default function RootLayout() {
  const authLoaderData = useRouteLoaderData("root-wrapper");
  console.log("auth loader data", authLoaderData);

  // For the apiClient to have these interceptors active, you must call the hook inside a component that stays mounted
  useAxios();

  return (
    <UIProvider>
      <AuthProvider initialAuthData={authLoaderData}>
        <Outlet />
      </AuthProvider>
    </UIProvider>
  );
}
