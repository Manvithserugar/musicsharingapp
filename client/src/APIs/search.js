import axios from "../axios";
import config from "../config";

export const search = async (query) => {
  try {
    const response = await axios.get(`${config.baseURL}/search`, {
      params: { query: query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
