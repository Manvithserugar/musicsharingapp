const { Saved } = require("../../models");
const { appError } = require("../../utils");

const unsaveTrack = async (trackId, userId) => {
  try {
    const result = await Saved.deleteOne({ userId, trackId });
    if (result.deletedCount === 0) {
      throw new appError("Track not found in saved tracks", 400);
    }
    return { success: true };
  } catch (error) {
    console.error("Error in unsaveTrack service:", error);
    throw error;
  }
};

module.exports = unsaveTrack;
