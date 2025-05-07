const { appError } = require("../../utils");
const { getTrack } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const track = await getTrack(id);

    if (!track) {
      return next(new appError("Track not found", 404));
    }

    res.status(200).json({
      message: "Track fetched successfully.",
      track,
    });
  } catch (error) {
    console.error("Error fetching track:", error.message);
    next(error);
  }
};
