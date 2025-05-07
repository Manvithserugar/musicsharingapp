const dotenv = require("dotenv");
dotenv.config();

const { DB_CONNECTION_URL, HTTP_PORT, SECRET_KEY } = process.env;

module.exports = {
  DB_CONNECTION_URL,
  HTTP_PORT,
  SECRET_KEY,
};
