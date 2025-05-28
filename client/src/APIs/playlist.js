import axios from "../axios";
import config from "../config";

const createPlaylist = async (body) => {
  try {
    const headers = { "Content-Type": "multipart/form-data" };
    const response = await axios.post(
      `${config.baseURL}/playlists/create`,
      body,
      { headers }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const addTrackToPlaylists = async (body) => {
  try {
    const response = await axios.post(
      `${config.baseURL}/playlists/add/track`,
      body
    );
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

const removeTrackFromPlaylist = async (playlistId, trackId) => {
  try {
    const response = await axios.delete(
      `${config.baseURL}/playlists/delete/track/${trackId}/${playlistId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export { createPlaylist, addTrackToPlaylists, removeTrackFromPlaylist };
