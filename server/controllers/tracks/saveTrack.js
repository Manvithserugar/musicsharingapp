const { saveTrack } = require("../../services");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { trackId } = req.params;
  const userId = req.user._id;

  try {
    const result = await saveTrack(trackId, userId);
    res.status(200).json({ message: "Track saved successfully", ...result });
  } catch (error) {
    next(error);
  }
};
