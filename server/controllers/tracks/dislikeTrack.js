const mongoose = require("mongoose");
const { dislikeTrack } = require("../../services");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { trackId } = req.params;
  const userId = req.user._id;

  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const updatedTrack = await dislikeTrack(trackId, userId, { session });
    if (!updatedTrack) {
      throw new appError("Track not found.", 404);
    }
    await session.commitTransaction();
    res
      .status(200)
      .json({ message: "Music disliked successfully", updatedTrack });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    next(error);
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
