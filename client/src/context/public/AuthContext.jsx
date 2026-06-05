import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../../api/endpoints.js";
import { useNavigate } from "react-router-dom";
import { useUI } from "../UIContext.jsx";
import { toast } from "react-toastify";

const AuthContext = createContext({
  user: { id: null, name: null, role: "guest" },
  setUser: () => {},
  getUser: () => {},
  logout: () => {},
  handleLogin: () => {},
  handleSignUp: () => {},
});

export function AuthProvider({ children, initialAuthData }) {
  // 1. Initialize state directly from the loader data if it exists
  const [user, setUser] = useState(() => {
    return initialAuthData || { id: null, name: null, role: "guest" };
  });

  const navigate = useNavigate();
  const { showBubbleLoader, hideBubbleLoader } = useUI();

  // 2. CRITICAL SYNC FIX:
  // When a user hits a hard refresh or triggers a revalidation, React Router's
  // loader updates 'initialAuthData'. We MUST sync that back into our local state!
  useEffect(() => {
    if (initialAuthData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(initialAuthData || { id: null, name: null, role: "guest" });
    }
  }, [initialAuthData]);

  const getUser = () => user;

  // logging ou user
  const logout = async () => {
    showBubbleLoader("Logging out...");
    try {
      // 1. Rename 'user' to 'backendUser' so it doesn't mess up your state variable
      const { message, success, user: backendUser } = await logoutUser();

      if (success) {
        // 2. Set a temporary role so the route guard freezes and doesn't panic
        setUser({ id: null, name: null, role: "logging_out" });

        // 3. Move to the home page immediately
        navigate("/", { replace: true });

        // 4. Reset to a normal guest once you land safely on the home page
        setTimeout(() => {
          setUser(backendUser || { id: null, name: null, role: "guest" });
          toast.success(message);
        }, 100);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      hideBubbleLoader();
    }
  };

  const handleLogin = async (loginCredentials) => {
    try {
      const response = await loginUser(loginCredentials);

      const userData = response.data.user;
      setUser(userData);

      return {
        message: response.data.message || "Login successful!",
        user: {
          name: userData.name,
          role: userData.role,
        },
      };
    } catch (error) {
      console.error("Login Error: ", error.message);
      throw error;
    }
  };

  const handleSignUp = async (registrationData) => {
    try {
      const response = await registerUser(registrationData);
      return {
        message:
          response.data.message ||
          "Registration successful! Login to continue.",
      };
    } catch (error) {
      console.error("Signup Error: ", error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        getUser,
        logout,
        handleLogin,
        handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
