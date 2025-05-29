const { Track, Artist } = require("../../models");

const search = async (query) => {
  try {
    const regex = new RegExp(query, "i"); // Case-insensitive search

    //Find artists matching the query
    const artists = await Artist.find({ name: regex })
      .select("_id name image")
      .sort({ artistPopularity: -1 }) // Sort by popularityScore in descending order
      .limit(5); // Limit to 5 results

    // Find tracks matching the query
    const tracks = await Track.find({
      $or: [{ name: regex }, { artist: regex }],
    })
      .select("_id name artist artistId thumbnailPath")
      .sort({ popularityScore: -1 }) // Sort by popularityScore in descending order
      .limit(5); // Limit to 5 results
    return { tracks, artists };
  } catch (error) {
    console.error("Error in searchTracks service:", error.message);
    throw error;
  }
};

module.exports = search;
