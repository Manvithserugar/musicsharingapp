import axios from "../axios";
import config from "../config";

export const registerAsArtist = async (body) => {
  try {
    const headers = { "Content-Type": "multipart/form-data" };
    const response = await axios.post(
      `${config.baseURL}/artists/create`,
      body,
      { headers }
    );
    return response;
  } catch (error) {
    throw error;
  }
};


