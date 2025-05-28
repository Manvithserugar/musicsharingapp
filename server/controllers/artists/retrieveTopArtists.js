const { retrieveTopArtists } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const topArtists = await retrieveTopArtists();

    res.status(200).json({
      message: "Top 10 artists fetched successfully.",
      topArtists,
    });
  } catch (error) {
    console.error("Error fetching top artists:", error.message);
    next(error);
  }
};
