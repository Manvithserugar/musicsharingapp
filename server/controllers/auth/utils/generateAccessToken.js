const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../consts");

const generateAccessToken = (user) => {
  const secretKey = SECRET_KEY;
  const payload = {
    sub: user._id.toString(),
    email: user.email,
    username: user.name,
    // roleId: user.role_id,
    iat: Math.floor(Date.now() / 1000), // Issued at (current time in seconds)
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
    iss: "http://localhost:3000", // Issuer
    aud: "http://localhost:3000", // Audience
  };

  const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });
  return token;
};

module.exports = generateAccessToken;
