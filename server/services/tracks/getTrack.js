const { Track } = require("../../models");

module.exports = async (trackId) => {
  try {
    // Find the track by its ID
    const track = await Track.findById(trackId);
    return track;
  } catch (error) {
    console.error("Error fetching track in service:", error.message);
    throw error;
  }
};
