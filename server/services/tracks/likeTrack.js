const { Track, Like } = require("../../models");
const { appError } = require("../../utils");

const likeTrack = async (trackId, userId, options = {}) => {
  const { session } = options;

  try {
    const track = await Track.findById(trackId).session(session);
    if (!track) {
      return;
    }

    // Check if the user has already liked the track
    const userLikes = await Like.findOne({ userId }).session(session);
    if (userLikes && userLikes.likedTracks.includes(trackId)) {
      throw new appError("User has already liked this track.", 409);
    }

    track.likes += 1;
    await track.save({ session });

    // If the userLikes document doesn't exist, create it
    let updatedUserLikes = userLikes;
    if (!userLikes) {
      updatedUserLikes = new Like({ userId, likedTracks: [] });
    }

    // Add the track to the user's likedTracks array
    updatedUserLikes.likedTracks.push(trackId);
    await updatedUserLikes.save({ session });

    return track;
  } catch (error) {
    console.error("Error in likeTrack service:", error.message);
    throw error;
  }
};

module.exports = likeTrack;
