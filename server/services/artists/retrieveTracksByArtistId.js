const { Track, Artist } = require("../../models");
const { appError } = require("../../utils");

module.exports = async (artistId) => {
  try {
    const artist = await Artist.findById(artistId);
    if (!artist) {
      throw new appError("Artist not found", 404);
    }
    const tracks = await Track.find({ artistId }).sort({ createdAt: -1 });

    return { tracks, artist };
  } catch (error) {
    console.error("Error retrieving tracks by artist ID (service):", error);
    throw error;
  }
};
