const { Track, Like } = require("../../models");
const { appError } = require("../../utils");

const dislikeTrack = async (trackId, userId, options = {}) => {
  const { session } = options;

  try {
    const track = await Track.findById(trackId).session(session);
    if (!track) {
      return;
    }
    track.likes -= 1;
    await track.save({ session });

    const deletedTrack = await Like.deleteOne(
      { userId, trackId },
      {
        session,
      }
    );
    if (deletedTrack.deletedCount === 0) {
      throw new appError(
        "You cannot dislike tracks which haven't been liked previously.",
        400
      );
    }

    return track;
  } catch (error) {
    console.error("Error in dislikeTrack service:", error.message);
    throw error;
  }
};

module.exports = dislikeTrack;
