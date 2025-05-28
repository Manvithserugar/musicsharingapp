const { Playlist } = require("../../models");

module.exports = async (playlistId) => {
  try {
    const populatedPlaylist = await Playlist.findById(playlistId).populate(
      "playlist"
    );
    return populatedPlaylist;
  } catch (err) {
    console.log("Error in getPlaylistById (service):", err);
    throw err;
  }
};
