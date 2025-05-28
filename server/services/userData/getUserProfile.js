const { user, Artist } = require("../../models");
const { appError } = require("../../utils");

module.exports = async (userId) => {
  try {
    const User = await user.findById(userId, {
      _id: 1,
      name: 1,
      email: 1,
      usertype: 1,
      artistId: 1,
    });
    if (!User) {
      throw new appError("User not found", 404);
    }
    let artist = null;
    if (User.usertype === "artist") {
      artist = await Artist.findById(User.artistId);
      if (!artist) {
        throw new appError("Artist not found for this user", 404);
      }
    }
    return { User, artist };
  } catch (error) {
    console.error("Error fetching user profile (service):", error);
    throw error;
  }
};
