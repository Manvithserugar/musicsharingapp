const { appError } = require("../../utils");
const { userTrackEngmtStatus } = require("../../services");

module.exports = async (req, res, next) => {
  const { trackId } = req.params;
  const userId = req.user._id;

  try {
    const status = await userTrackEngmtStatus(trackId, userId);
    res.status(200).json(status);
  } catch (error) {
    console.error("Error checking engagement status:(controller)", error);
    next(error);
  }
};
