const { appError } = require("../../utils");
const { fetchSavedTracks } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const savedTracks = await fetchSavedTracks(userId);
    if (!savedTracks) {
      return next(new appError("No saved tracks found", 404));
    }
    res.status(200).json({
      status: "success",
      data: savedTracks.map((doc) => doc.trackId),
    });
  } catch (error) {
    console.log("error fetching saved tracks", error);
    next(error);
  }
};
