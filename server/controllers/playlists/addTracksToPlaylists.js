const { appError } = require("../../utils");
const { addTracksToPlaylists } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { trackId, selectedPlaylists } = req.body;
    const { alreadyPresent } = await addTracksToPlaylists(
      userId,
      trackId,
      selectedPlaylists
    );

    res.status(200).json({
      success: true,
      message: "tracks inserted into playlists successfully",
      alreadyPresent,
    });
  } catch (err) {
    console.log("error while adding to playlists (controller): ", err);
    next(err);
  }
};
