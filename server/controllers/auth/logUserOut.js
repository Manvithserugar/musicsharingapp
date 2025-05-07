const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      return next(new appError("Cannot logout, User not found", 404));
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      path: "/",
    });

    return res.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Error during logout: ", error);
    next(error);
  }
};
