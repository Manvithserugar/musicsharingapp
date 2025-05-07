const { user } = require("../../models");

module.exports = async (name, email, password, options = {}) => {
  try {
    const { session } = options;

    const newUser = new user({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save({ session });
    console.log(savedUser);

    return savedUser;
  } catch (error) {
    console.error(
      "Error occurred during database operation(registerUser):",
      error.message,
      error
    );
    throw error;
  }
};
