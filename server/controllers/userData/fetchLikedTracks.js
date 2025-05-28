const { appError } = require("../../utils");
const { fetchLikedTracks } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const LikedTracks = await fetchLikedTracks(userId);
    if (!LikedTracks) {
      return next(new appError("No liked tracks found", 404));
    }
    res.status(200).json({
      status: "success",
      data: LikedTracks,
    });
  } catch (error) {
    console.log("error fetching liked tracks", error);
    next(error);
  }
};
