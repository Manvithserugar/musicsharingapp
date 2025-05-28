const { removeTrackFromPlaylist } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const { trackId, playlistId } = req.params;
    const userId = req.user._id;
    await removeTrackFromPlaylist(userId, playlistId, trackId);
    res.status(200).json({
      success: true,
      message: "Track removed from playlist successfully",
    });
  } catch (err) {
    console.log("Error in removeTrackFromPlaylist (controller):", err);
    next(err);
  }
};
