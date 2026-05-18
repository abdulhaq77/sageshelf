import apiClient from "../config/api.config.js";

// ------------------------------ Auth Endpoints ------------------------------

// Authenticate me - get current user profile
export const fetchCurrentUser = async () => {
  console.log("Fetching current user profile...");
  try {
    const response = await apiClient.get("/auth/me");
    console.log("Fetched Current User response:", response);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error.response);
    return error.response?.data.user;
  }
};

// login alreaday registered user
export const loginUser = async (credentials) => {
  console.log("4. Attempting Network Call with:", credentials);
  try {
    const res = await apiClient.post("/auth/login", credentials);
    return res;
  } catch (err) {
    console.error("NETWORK ERROR:", err);
    throw err;
  }
};

// register a new user
export const registerUser = async (registrationData) =>
  await apiClient.post("/auth/register", registrationData);

// refresh token
export const getAccessToken = async () => {
  try {
    const response = await apiClient.get("/auth/refresh");
    return response.data;
  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error);
    throw error;
  }
};

// logout user
export const logoutUser = async () => {
  try {
    const response = await apiClient.post("/auth/logout", {});
    console.log("logout resp : ", response.data);
    return response.data;
  } catch (error) {
    console.error("NETWORK ERROR:", error);
    throw error;
  }
};

// ------------------------------ User Endpoints ------------------------------

// ------------------------------ Seller Endpoints ------------------------------

// upload new book
export const uploadAsset = async (BookData) => {
  console.log("Uploading Book Data:", BookData);
  return await apiClient.post("/seller/upload/new-book", BookData);
};

// get seller inventory
export const getSellerInventory = async () => {
  try {
    const response = await apiClient.get("/seller/inventory");
    return response.data;
  } catch (error) {
    console.error("NETWORK ERROR:", error);
    throw error;
  }
};
