const { retrieveTracksByArtistId } = require("../../services");

module.exports = async (req, res, next) => {
  const { artistId } = req.params;
  try {
    const { tracks, artist } = await retrieveTracksByArtistId(artistId);
    res.status(200).json({
      success: true,
      message: "Tracks retrieved successfully",
      artist,
      data: tracks,
    });
  } catch (error) {
    console.error("Error retrieving tracks by artist ID (controller):", error);
    next(error);
  }
};
