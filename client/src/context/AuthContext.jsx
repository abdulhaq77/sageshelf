import React, { createContext, useContext, useState } from "react";
import Loader from "../components/Loader";
import { loginUser, registerUser, logoutUser } from "../api/endpoints.js";
import { redirect } from "react-router-dom";
import { useUI } from "./UIContext.jsx";

const AuthContext = createContext({
  accessToken: "",
  user: {},
  setAccessToken: () => {},
  getAccessToken: () => {},
  clearAccessToken: () => {},
  getUser: () => {},
  logout: () => {},
  handleLogin: () => {},
  handleSignUp: () => {},
});

// AuthProvider will wrap the entire app
export function AuthProvider({ children, initialAuthData }) {
  // states
  const [accessToken, setAccessToken] = useState(
    initialAuthData?.accessToken || null,
  );
  const [user, setUser] = useState(
    initialAuthData?.user || { name: null, role: "guest" }, // default role is "guest"
  );

  // hooks
  const { showBubbleLoader, hideBubbleLoader } = useUI();

  // functions
  const getAccessToken = () => {
    return accessToken;
  };
  const clearAccessToken = () => {
    setAccessToken(null);
  };

  const getUser = () => {
    return user;
  };
  const logout = async () => {
    showBubbleLoader("Logging out...");
    console.log("Logging out user:", user);
    try {
      const data = await logoutUser();
      if (data.success) {
        clearAccessToken();
        setUser(data.user);
        // navigate to home page after logout
        redirect("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      hideBubbleLoader();
    }
  };

  // loggingIn user
  const handleLogin = async (loginCredentials) => {
    try {
      // calling login API
      const response = await loginUser(loginCredentials);
      setAccessToken(response.data.accessToken);
      setUser(response.data.user);

      // Return the user role for redirection
      return {
        message: response.data.message || "Login successful!",
        user: {
          name: response.data.user.name,
          role: response.data.user.role,
        },
      };
    } catch (error) {
      console.log("error : ", error.message);
      throw error;
    }
  };
  // registering user
  const handleSignUp = async (registrationData) => {
    try {
      const response = await registerUser(registrationData);

      // Return the success message for display in the UI
      return {
        message:
          response.data.message ||
          "Registration successful! Login to continue.",
      };
    } catch (error) {
      console.log("error : ", error.response.data);
      throw error;
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          accessToken,
          user,
          setAccessToken,
          getAccessToken,
          clearAccessToken,
          setUser,
          getUser,
          logout,
          handleLogin,
          handleSignUp,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

// Custom hook for easy access to AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
