import { fetchCurrentUser } from "../api/endpoints.js";

export async function authLoader() {
  try {
    const currentUser = await fetchCurrentUser();
    console.log("Auth Loader - Current User:", currentUser);
    return currentUser;
  } catch (error) {
    console.error("Error fetching user profile at auth loader:", error);
    return error.response?.data.user;
  }
}

export function shouldRevalidate({ actionResult }) {
  // Only re-run the root auth check if a form action has fired (like logging in/out)
  if (actionResult) return true;

  // Blocks React Router from re-calling /auth/me on standard link clicks
  return false;
}
