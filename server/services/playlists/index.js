const createPlaylist = require("./createPlaylist");
const getUserPlaylists = require("./getUserPlaylists");
const addTracksToPlaylists = require("./addTracksToPlaylists");
const removeTrackFromPlaylist = require("./removeTrackFromPlaylist");
const getPlaylistById = require("./getPlaylistById");

module.exports = {
  createPlaylist,
  getUserPlaylists,
  addTracksToPlaylists,
  removeTrackFromPlaylist,
  getPlaylistById,
};
