const mongoose = require("mongoose");

const { Artist, user: User } = require("../../models");
const { appError } = require("../../utils");

const registerArtist = async (artistName, artistImage, bannerImage, userId) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    // Create Artist
    const artist = new Artist({
      name: artistName,
      image: artistImage,
      bannerImage: bannerImage,
    });
    await artist.save({ session });

    // Update User
    // Update User
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new appError("User not found", 404);
    }
    if (user.usertype === "artist" && user.artistId) {
      throw new appError("Artist already exists for this user", 400);
    }
    user.usertype = "artist";
    user.artistId = artist._id;
    await user.save({ session });

    await session.commitTransaction();
    return artist;
  } catch (error) {
    if (session) await session.abortTransaction();
    throw error;
  } finally {
    if (session) session.endSession();
  }
};

module.exports = registerArtist;
