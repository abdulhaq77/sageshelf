import apiClient from "../config/api.config.js";

// ------------------------------ Auth Endpoints ------------------------------

// Authenticate me - get current user profile
export const fetchCurrentUser = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    console.log("Fetched Current User response:", response.data);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error.response);
    return error.response?.data.user;
  }
};

// login alreaday registered user
export const loginUser = async (credentials) => {
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
    return response.data;
  } catch (error) {
    console.error("NETWORK ERROR:", error);
    throw error;
  }
};

// ------------------------------ Public Endpoints ------------------------------

// get featured books for homepage
export const getFeaturedBooks = async () => {
  try {
    const response = await apiClient.get("/get/books/featured");
    return response.data;
  } catch (error) {
    console.error("Error fetching featured books:", error);
    throw error;
  }
};

// ------------------------------ Seller Endpoints ------------------------------

// upload new book
export const uploadAsset = async (BookData) => {
  const response = await apiClient.post("/seller/upload/new-book", BookData);
  return response.data;
};

// get seller inventory
export const getSellerInventory = async (page, limit) => {
  try {
    const response = await apiClient.get(
      `/seller/inventory?page=${page}&limit=${limit}`,
    );
    return response;
  } catch (error) {
    console.error("NETWORK ERROR:", error);
    throw error;
  }
};

// update seller inventory
export const updateSellerInventory = async (bookId, status) => {
  try {
    const response = await apiClient.patch(
      `/seller/inventory/${bookId}/status`,
      status,
    );
    return response;
  } catch (error) {
    console.log("Seller Inventory update Error : ", error);
    throw error;
  }
};

// delete seller single listing
export const deleteSellerListing = async (bookId) => {
  try {
    const response = await apiClient.delete(`/seller/inventory/${bookId}`);
    return response;
  } catch (error) {
    console.log("Seller delete listing Error : ", error);
    throw error;
  }
};

// ------------------------------ Search Endpoints ------------------------------

// search suggestions
export const searchSuggestions = async (cleanQuery) => {
  try {
    const response = await apiClient.post("/search/suggestions", {
      query: cleanQuery,
    });
    return response;
  } catch (error) {
    console.log("Search Suggestions Error : ", error);
    throw error;
  }
};

// get searched books
export const getSearchedBooks = async (queryParams) => {
  console.log("params : ", queryParams);
  try {
    const response = await apiClient.get("/get/books", {
      params: queryParams,
    });
    return response;
  } catch (error) {
    console.log("Searched Books Error : ", error);
    throw error;
  }
};
