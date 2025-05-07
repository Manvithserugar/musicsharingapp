const { Track, Album } = require("../../models");

const search = async (query) => {
  try {
    const regex = new RegExp(query, "i"); // Case-insensitive search

    // Find matching albums
    const matchingAlbums = await Album.find({ name: regex }).select("_id");
    const albumIds = matchingAlbums.map((album) => album._id);

    // Find tracks matching the query
    const tracks = await Track.find({
      $or: [
        { name: regex },
        { artist: regex },
        { album: { $in: albumIds } }, // Match albums by ID
      ],
    })
      .select("name artist album likes popularityScore thumbnailPath")
      .sort({ popularityScore: -1 }); // Sort by popularityScore in descending order

    return tracks;
  } catch (error) {
    console.error("Error in searchTracks service:", error.message);
    throw error;
  }
};

module.exports = search;
