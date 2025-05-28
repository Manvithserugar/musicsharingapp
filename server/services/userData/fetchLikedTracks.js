const { Like } = require("../../models");

const fetchLikedTracks = async (userId) => {
  try {
    const likedTracks = await Like.find({ userId }).populate("trackId").sort({
      likedAt: -1,
    });
    if (likedTracks.length === 0) return null;
    return likedTracks.map((doc) => doc.trackId);
  } catch (error) {
    console.log("error fetching saved tracks (service):", error);
    throw error;
  }
};

module.exports = fetchLikedTracks;
