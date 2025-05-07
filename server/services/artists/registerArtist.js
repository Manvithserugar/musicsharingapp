const mongoose = require("mongoose");

const { Artist, User } = require("../../models");
const { appError } = require("../../utils");

const registerArtist = async (artistName, artistImage, userId) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    // Create Artist
    const artist = new Artist({
      name: artistName,
      image: artistImage,
    });
    await artist.save({ session });

    // Update User
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
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
