const { getUserPlaylists } = require("../../services");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userPlaylists = await getUserPlaylists(userId);
    if (userPlaylists.length === 0) {
      throw new appError("Playlists not found for the user", 404);
    }
    res.status(200).json({ message: "success", userPlaylists });
  } catch (err) {
    console.log("error while fetching user playlists (controller) : ", err);
    next(err);
  }
};
