const { Playlist } = require("../../models");
const { appError } = require("../../utils");

module.exports = async (userId, playlistId, trackId) => {
  try {
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { _id: playlistId, userId, playlist: trackId },
      { $pull: { playlist: trackId } },
      { new: true }
    );
    if (!updatedPlaylist) {
      throw new appError("Playlist not found or track not present", 404);
    }
  } catch (err) {
    console.log("Error in removeTrackFromPlaylist (service):", err);
    throw err;
  }
};
