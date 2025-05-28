const { Saved } = require("../../models");
const { appError } = require("../../utils");

const saveTrack = async (trackId, userId) => {
  try {
    await Saved.create({ userId, trackId });
    return { success: true };
  } catch (error) {
    console.error("Error in saveTrack service:", error.message);
    throw error;
  }
};

module.exports = saveTrack;
