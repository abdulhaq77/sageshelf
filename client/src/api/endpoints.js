import apiClient from "./api.config";

// --- Auth Endpoints ---
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

export const registerUser = async (registrationData) =>
  await apiClient.post("/auth/register", registrationData);

export const getAccessToken = async () => await apiClient.get("/auth/refresh");

export const logoutUser = async () => {
  try {
    const response = await apiClient.post("/auth/logout", {});
    return response.data;
  } catch (error) {
    console.error("NETWORK ERROR:", error);
    throw error;
  }
};

// --- User Endpoints ---
export const getUserProfile = async (accessToken) => {
  // Pass the token in the Authorization header
  return await apiClient.get("/user/profile", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

// --- Product/Asset Endpoints ---
export const getAssets = (params) => apiClient.get("/assets", { params });
export const getAssetById = (id) => apiClient.get(`/assets/${id}`);

// --- Seller Endpoints ---
export const uploadAsset = (formData) =>
  apiClient.post("/seller/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }, // For file uploads
  });

// --- User/Profile Endpoints ---
export const getProfile = () => apiClient.get("/user/profile");
export const updateProfile = (data) => apiClient.put("/user/profile", data);
