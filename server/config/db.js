const mongoose = require("mongoose");
const { DB_CONNECTION_URL } = require("../consts");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

function checkConnection() {
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
  });
}

module.exports = {
  connectDB,
  checkConnection,
};
