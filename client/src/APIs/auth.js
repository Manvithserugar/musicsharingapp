import axios from "../axios";
import config from "../config";

const signupUser = async (user) => {
  try {
    const response = await axios.post(`${config.baseURL}/auth/signup`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (user) => {
  try {
    const response = await axios.post(`${config.baseURL}/auth/login`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

const logUserOut = async () => {
  try {
    const response = await axios.post(`${config.baseURL}/auth/logout`);
    return response;
  } catch (err) {
    throw err;
  }
};

export default {
  signupUser,
  loginUser,
  logUserOut,
};
