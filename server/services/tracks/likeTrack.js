const { Track, Like } = require("../../models");
const { appError } = require("../../utils");

const likeTrack = async (trackId, userId, options = {}) => {
  const { session } = options;

  try {
    const track = await Track.findById(trackId).session(session);
    if (!track) {
      return;
    }
    track.likes += 1;
    await track.save({ session });

    await Like.create([{ userId, trackId }], { session });

    return track;
  } catch (error) {
    console.error("Error in likeTrack service:", error.message);
    throw error;
  }
};

module.exports = likeTrack;
