const db = require("./db");
const passportConfig = require("./passportConfig");

module.exports = {
  ...db,
  ...passportConfig,
};
