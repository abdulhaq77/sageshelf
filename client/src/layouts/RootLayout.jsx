import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/public/AuthContext.jsx";
import { UIProvider } from "../context/UIContext.jsx";

export default function RootLayout() {
  const authLoaderData = useRouteLoaderData("root-wrapper");

  return (
    <UIProvider>
      <AuthProvider initialAuthData={authLoaderData}>
        <Outlet />
      </AuthProvider>
    </UIProvider>
  );
}
