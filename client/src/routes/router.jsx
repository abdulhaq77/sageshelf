import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "../layouts/RootLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import SellerLayout from "../layouts/SellerLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// Pages
import RoleRedirector from "../components/RoleRedirector.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import Categories from "../pages/Categories.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Cart from "../pages/Cart.jsx";
import ProfileIcon from "../components/ProfileIcon.jsx";
import StartSelling from "../pages/StartSelling.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Settings from "../pages/Buyer/Settings.jsx";
import BuyerBookDetails from "../pages/BuyerBookDetails.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import CheckoutDrawer from "../components/buyer/CheckoutDrawer.jsx";
import BuyerLibrary from "../pages/Buyer/BuyerLibrary.jsx";
import BuyerOrders from "../pages/Buyer/BuyerOrders.jsx";
import SellerDashboard from "../pages/seller/SellerDashboard.jsx";
import SellerInventory from "../pages/seller/SellerInventory.jsx";
import SellerAnalytics from "../pages/seller/SellerAnalytics.jsx";
import SellerSettings from "../pages/seller/SellerSettings.jsx";
import AddNewBook from "../pages/seller/AddNewBook.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";

// contexts
import { SellerProvider } from "../context/SellerContext.jsx";
import { PublicBookProvider } from "../context/public/PublicBookContext.jsx";

// Structural Guards
import ProtectedRoute from "../components/ProtectedRoute.jsx";

// Loaders & Performance Optimizers
import GlobalAppLoader from "../components/spinners/GlobalAppLoader.jsx";
import {
  authLoader,
  shouldRevalidate,
} from "../router-loader-functions/authLoader.js";

const router = createBrowserRouter([
  {
    id: "root-wrapper",
    element: <RootLayout />,
    loader: authLoader,
    shouldRevalidate: shouldRevalidate, // ⚡ PERFORMANCE: Prevents auth checking on standard page clicks
    hydrateFallbackElement: <GlobalAppLoader />, // Handles server hydration/initial loader wait cleanly
    children: [
      // ---------------------------- GUEST ROUTES ----------------------------
      {
        path: "/",
        element: (
          <PublicBookProvider>
            <MainLayout />,
          </PublicBookProvider>
        ),
        id: "main-wrapper",
        children: [
          { index: true, element: <RoleRedirector /> }, //Acts as a role redirector, checks role and navigate user to desired path based on role otherwise return Home page
          { path: "categories", element: <Categories /> },
          { path: "about", element: <About /> },
          { path: "contact-us", element: <Contact /> },
          { path: "book/details/:id", element: <BuyerBookDetails /> },
        ],
      },

      // ---------------------------- BUYER ROUTES ----------------------------
      {
        path: "/buyer",
        element: <ProtectedRoute allowedRoles={["buyer"]} />, // ⚡ CLEANER: Acts as layout-level gate
        children: [
          {
            element: <MainLayout />, // Reuses layout structure cleanly
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
        ],
      },

      {
        path: "book/checkout/:id",
        element: <ProtectedRoute allowedRoles={["buyer"]} />,
        children: [{ path: "", element: <CheckoutDrawer /> }], // Fixed path nesting typo
      },

      // ---------------------------- SELLER ROUTES ----------------------------
      {
        path: "/seller",
        id: "seller-wrapper",
        element: (
          <ProtectedRoute allowedRoles={["seller"]}>
            <SellerProvider>
              <SellerLayout />
            </SellerProvider>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <SellerDashboard /> },
          { path: "dashboard", element: <SellerDashboard /> },
          { path: "add-new-book", element: <AddNewBook /> },
          { path: "inventory", element: <SellerInventory /> },
          { path: "analytics", element: <SellerAnalytics /> },
          { path: "settings", element: <SellerSettings /> },
        ],
      },

      // ---------------------------- ADMIN ROUTES ----------------------------
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "dashboard", element: <AdminDashboard /> },
        ],
      },

      // ---------------------------- STANDALONE ROUTES ----------------------------
      { path: "/auth", element: <AuthPage /> },
      { path: "/unauthorized", element: <Unauthorized /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
