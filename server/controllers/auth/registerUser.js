const mongoose = require("mongoose");

const { registerUser } = require("../../services/auth");
const { generateAccessToken } = require("./utils");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const user = await registerUser(name, email, password, { session });

    const token = generateAccessToken(user);

    await session.commitTransaction();

    res.cookie("jwt", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({ message: "user signed up" });
  } catch (err) {
    console.log("error while signing up : ", err);

    if (session) {
      await session.abortTransaction();
    }

    next(err);
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
