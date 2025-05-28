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
    const headers = { "Content-Type": "multipart/form-data" };
    const response = await axios.post(
      `${config.baseURL}/tracks/upload`,
      track,
      { headers }
    );
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
    const response = await axios.delete(
      `${config.baseURL}/tracks/${id}/dislike`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const saveTrack = async (id) => {
  try {
    const response = await axios.post(`${config.baseURL}/tracks/${id}/save`);
    return response;
  } catch (error) {
    throw error;
  }
};

const unsaveTrack = async (id) => {
  try {
    const response = await axios.delete(
      `${config.baseURL}/tracks/${id}/unsave`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  uploadTrack,
  getTopTracks,
  getTrack,
  deleteTrack,
  likeTrack,
  dislikeTrack,
  saveTrack,
  unsaveTrack,
};
