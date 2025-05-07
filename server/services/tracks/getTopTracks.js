const { Track } = require("../../models");

module.exports = async () => {
  try {
    // Fetch top 10 tracks sorted by popularity score in descending order
    const topTracks = await Track.find({})
      .sort({ popularityScore: -1 }) // Sort by popularityScore descending
      .limit(10); // Limit results to 10

    return topTracks;
  } catch (error) {
    console.error("Error fetching top tracks in service:", error.message);
    throw error;
  }
};
