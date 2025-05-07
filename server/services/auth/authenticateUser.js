const { user } = require("../../models");

const authenticateUser = async (email, password, options = {}) => {
  try {
    const { session } = options;

    // Find the user in the database
    const authenticatedUser = await user
      .findOne({ email, password })
      .session(session); // Use session if provided

    return authenticatedUser;
  } catch (err) {
    console.error(
      "Error occurred during database operation(authenticateUser):",
      err.message,
      err
    );
    throw err;
  }
};

module.exports = authenticateUser;
