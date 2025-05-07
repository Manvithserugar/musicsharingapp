const { Track, Like } = require("../../models");
const { appError } = require("../../utils");

const dislikeTrack = async (trackId, userId, options = {}) => {
  const { session } = options;

  try {
    const track = await Track.findById(trackId).session(session);
    if (!track) {
      return;
    }

    // Check if the user has liked the track
    const userLikes = await Like.findOne({ userId }).session(session);
    if (!userLikes || !userLikes.likedTracks.includes(trackId)) {
      throw new appError(
        "You cannot dislike tracks which haven't been liked previously.",
        400
      );
    }

    // Remove the track from the user's likedTracks array
    userLikes.likedTracks = userLikes.likedTracks.filter(
      (likedTrackId) => likedTrackId.toString() !== trackId
    );
    await userLikes.save({ session });

    track.likes -= 1;
    await track.save({ session });

    return track;
  } catch (error) {
    console.error("Error in dislikeTrack service:", error.message);
    throw error;
  }
};

module.exports = dislikeTrack;
