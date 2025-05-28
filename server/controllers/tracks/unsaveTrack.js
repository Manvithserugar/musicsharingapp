const { unsaveTrack } = require("../../services");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { trackId } = req.params;
  const userId = req.user._id;

  try {
    const result = await unsaveTrack(trackId, userId);
    res.status(200).json({ message: "Track unsaved successfully", ...result });
  } catch (error) {
    console.log("Error in unsaveTrack controller:", error);
    next(error);
  }
};
