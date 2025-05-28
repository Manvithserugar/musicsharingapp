const { Saved } = require("../../models");

const fetchSavedTracks = async (userId) => {
  try {
    const savedTracks = await Saved.find({ userId }).populate("trackId").sort({
      savedAt: -1,
    });
    if (savedTracks.length === 0) return null;
    return savedTracks;
  } catch (error) {
    console.log("error fetching saved tracks (service):", error);
    throw error;
  }
};

module.exports = fetchSavedTracks;
