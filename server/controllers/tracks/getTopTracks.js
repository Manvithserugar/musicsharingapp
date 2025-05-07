const { getTopTracks } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const topTracks = await getTopTracks();

    res.status(200).json({
      message: "Top 10 tracks fetched successfully.",
      topTracks,
    });
  } catch (error) {
    console.error("Error fetching top tracks:", error.message);
    next(error);
  }
};
