const { getUserProfile } = require("../../services");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profile = await getUserProfile(userId);

    if (!profile) {
      throw new appError("User profile not found", 404);
    }

    res
      .status(200)
      .json({ message: "user profile retrieved successfully", profile });
  } catch (error) {
    console.error("Error fetching user profile (controller):", error);
    next(error); // Pass the error to the global error handler
  }
};
