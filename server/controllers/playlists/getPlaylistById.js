const { getPlaylistById } = require("../../services");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return next(new appError("Playlist not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Playlist retrieved successfully",
      data: playlist,
    });
  } catch (err) {
    console.log("Error in getPlaylistById (controller):", err);
    next(err);
  }
};
