// components/RoleRedirector.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/public/AuthContext.jsx";
import Home from "../pages/Home.jsx";

export default function RoleRedirector() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is a Seller or Admin, they shouldn't be on the main landing page
    if (user?.role === "seller") {
      navigate("/seller/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin", { replace: true });
    }
    // Guests and Buyers remain here to see the Home/Catalog page
  }, [user?.role, navigate]);

  // While checking or if role is buyer/guest, show the Home page
  return <Home />;
}
