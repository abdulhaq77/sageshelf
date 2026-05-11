import { getAccessToken } from "../api/endpoints";

export const getNewAccessToken = async () => {
  try {
    const response = await getAccessToken();
    return response.data;
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
