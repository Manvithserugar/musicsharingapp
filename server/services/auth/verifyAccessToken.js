const { user } = require("../../models");

module.exports = async (id, email) => {
  try {
    const authenticatedUser = await user.findOne({ _id: id, email }).exec();
    console.log(authenticatedUser);
    return authenticatedUser;
  } catch (error) {
    console.error(
      "Error fetching user(database operation in verifyAccessToken): ",
      error
    );
    throw error;
  }
};
