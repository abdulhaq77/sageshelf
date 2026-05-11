import { getNewAccessToken } from "../utils/authUtils.js";

export async function authLoader() {
  try {
    // Get the new access token
    const { accessToken, user } = await getNewAccessToken();

    return { user, accessToken };
  } catch (error) {
    console.error("error ... : ", error.response?.data || error.message);
    if (error.response?.data.refreshToken === null) {
      return { user: error.response?.data.user, accessToksen: null };
    }
  }
}
