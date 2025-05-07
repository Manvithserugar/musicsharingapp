import axios from "../axios";
import config from "../config";

const getTopTracks = async () => {
  try {
    const response = await axios.get(`${config.baseURL}/tracks/top`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTrack = async (id) => {
  try {
    const response = await axios.get(`${config.baseURL}/tracks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadTrack = async (track) => {
  try {
    const response = await axios.post(`${config.baseURL}/tracks/upload`, track);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteTrack = async (id) => {
  try {
    const response = await axios.delete(`${config.baseURL}/tracks/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const likeTrack = async (id) => {
  try {
    const response = await axios.post(`${config.baseURL}/tracks/${id}/like`);
    return response;
  } catch (error) {
    throw error;
  }
};

const dislikeTrack = async (id) => {
  try {
    const response = await axios.post(`${config.baseURL}/tracks/${id}/dislike`);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  uploadTrack,
  getTopTracks,
  getTrack,
  deleteTrack,
  likeTrack,
  dislikeTrack,
};
