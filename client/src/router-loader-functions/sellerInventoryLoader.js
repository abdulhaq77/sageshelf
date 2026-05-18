import { getSellerInventory } from "../api/endpoints.js";
import { redirect } from "react-router-dom";

// for fetching seller invevntory data from backend
export const sellerInventoryLoader = async () => {
  try {
    // The interceptor handles the token refresh behind the scenes using your cookies
    const response = await getSellerInventory();
    return response.data;
  } catch (err) {
    console.error("Error fetching seller inventory:", err);
    // If the cookie is expired/missing, redirect to login
    throw redirect("/login");
  }
};
