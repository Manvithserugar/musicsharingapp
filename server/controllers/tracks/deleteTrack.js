const { appError } = require("../../utils");
const { deleteTrack } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteTrack(id);

    if (!result) {
      return next(new appError("Track not found.", 404));
    }

    res.status(200).json({ message: "Track deleted successfully." });
  } catch (error) {
    next(error);
  }
};
