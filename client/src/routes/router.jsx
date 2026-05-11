import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "../layouts/RootLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import SellerLayout from "../layouts/SellerLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// Pages
import AuthPage from "../pages/AuthPage.jsx";
import Home from "../pages/Home.jsx";
import Categories from "../pages/Categories.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Cart from "../pages/Cart.jsx";
import ProfileIcon from "../components/ProfileIcon.jsx";
import StartSelling from "../pages/StartSelling.jsx";
import SellerDashboard from "../pages/seller/SellerDashboard.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Settings from "../pages/Buyer/Settings.jsx";
import BuyerBookDetails from "../pages/BuyerBookDetails.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import CheckoutDrawer from "../components/buyer/CheckoutDrawer.jsx";
import BuyerLibrary from "../pages/Buyer/BuyerLibrary.jsx";
import BuyerOrders from "../pages/Buyer/BuyerOrders.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";

// Components
import ProtectedRoute from "../components/ProtectedRoute.jsx";

// Spinners
import GlobalAppLoader from "../components/spinners/GlobalAppLoader.jsx";

// Loader functions
import { authLoader } from "../router-loader-functions/authLoader.js";
import Profile from "../components/ProfileIcon.jsx";

// // A simple generic loader to trigger the navigation state
// const genericLoader = async () => {
//   // If you want to see the spinner during testing, uncomment the line below:
//   await new Promise((r) => setTimeout(r, 3000));
//   return null;
// };

const router = createBrowserRouter([
  {
    id: "root-wrapper",
    element: <RootLayout />, // for guest routes
    loader: authLoader,
    hydrateFallbackElement: <GlobalAppLoader />,
    children: [
      //  ------------------------------guest routes------------------------------
      {
        path: "/",

        element: <MainLayout />,
        id: "main-wrapper",
        children: [
          { index: true, element: <Home /> },
          {
            path: "categories",
            element: <Categories />,
          },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
          { path: "/book/details/:id", element: <BuyerBookDetails /> },
        ],
      },

      //  ------------------------------buyer routes------------------------------
      {
        path: "/buyer",
        element: (
          <ProtectedRoute allowedRoles={["buyer"]}>
            <MainLayout />
          </ProtectedRoute>
        ), //for buyers only
        children: [
          { path: "cart", element: <Cart /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "profile", element: <ProfileIcon /> },
          { path: "my-library", element: <BuyerLibrary /> },
          { path: "orders", element: <BuyerOrders /> },
          { path: "sell", element: <StartSelling /> },
          { path: "settings", element: <Settings /> },
        ],
      },

      {
        path: "book/checkout/:id",
        element: <ProtectedRoute allowedRoles={["buyer"]} />,
        children: [{ path: "book/checkout/:id", element: <CheckoutDrawer /> }],
      },

      //  ------------------------------seller routes------------------------------

      {
        path: "/seller",
        element: (
          <ProtectedRoute allowedRoles={["seller"]}>
            <SellerLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, path: "dashboard", element: <SellerDashboard /> },
        ],
      },

      //  ------------------------------admin routes------------------------------

      {
        path: "/admin",
        element: (
          // <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout />
          // </ProtectedRoute>
        ),
        children: [
          { index: true, path: "dashboard", element: <AdminDashboard /> },
        ],
      },

      //  ------------------------------standalone routes------------------------------
      // Auth Page
      { path: "/auth", element: <AuthPage /> },

      // Unauthorized
      { path: "/unauthorized", element: <Unauthorized /> },

      // Catch-all 404/Redirect
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
