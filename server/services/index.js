const auth = require("./auth");
const tracks = require("./tracks");
const search = require("./search");
const artists = require("./artists");

module.exports = {
  ...auth,
  ...tracks,
  ...search,
  ...artists,
};
