import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout
import RootLayout from "../layouts/RootLayout.jsx";
import CustomerLayout from "../layouts/CustomerLayout.jsx";
import SellerLayout from "../layouts/SellerLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// Pages
import AuthPage from "../pages/AuthPage.jsx";
import Home from "../pages/Home.jsx";
import HomePage from "../pages/Home.jsx";
import Categories from "../pages/Categories.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";

// Defining routes
const router = createBrowserRouter([
  // guest routes
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },

  // customer routes
  {
    path: "/customer",
    element: <CustomerLayout />,
  },

  // Seller routes
  {
    path: "/seller",
    element: <SellerLayout />,
  },

  // Admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
  },

  {
    // Catch-all route to redirect back home if someone types a wrong URL
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
