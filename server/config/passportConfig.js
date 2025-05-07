const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { verifyAccessToken } = require("../services/auth");
const { SECRET_KEY } = require("../consts");
const { appError } = require("../utils");

const configurePassport = () => {
  const secretKey = SECRET_KEY;
  const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies["jwt"]]),
    secretOrKey: secretKey,
    issuer: "http://localhost:3000",
    audience: "http://localhost:3000",
    algorithms: ["HS256"],
    ignoreExpiration: false,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const { sub, email } = jwt_payload;

      try {
        const user = await verifyAccessToken(sub, email);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(new appError(err.message, 500));
    }
    if (!user) {
      return next(new appError("Unauthenticated, User not found", 401));
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  configurePassport,
  authenticateJWT,
};
