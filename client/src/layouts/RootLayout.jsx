import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { AuthProvider } from "../context/public/AuthContext.jsx";
import { UIProvider } from "../context/UIContext.jsx";

export default function RootLayout() {
  const authLoaderData = useRouteLoaderData("root-wrapper");
  // For the apiClient to have these interceptors active, you must call the hook inside a component that stays mounted
  useAxios();

  console.log("RootLayout: authLoaderData:", authLoaderData);

  return (
    <UIProvider>
      <AuthProvider initialAuthData={authLoaderData}>
        <Outlet />
      </AuthProvider>
    </UIProvider>
  );
}
