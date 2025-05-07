const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const {
  connectDB,
  checkConnection,
  configurePassport,
  authenticateJWT,
} = require("./config");

const { auth, tracks, search, artists } = require("./routes");

const { globalErrorHandler } = require("./middlewares");

const { appError } = require("./utils");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
dotenv.config();

const { HTTP_PORT } = require("./consts");

const port = HTTP_PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).send("server reached");
});

connectDB();
checkConnection();
configurePassport();

// app.use(
//   "/uploads/music",
//   express.static(path.join(__dirname, "uploads/music"))
// );
app.use(
  "/uploads/thumbnails",
  express.static(path.join(__dirname, "uploads/thumbnails"))
);
app.use(
  "/uploads/artists",
  express.static(path.join(__dirname, "uploads/artists"))
);

app.use(auth);
// app.use(authenticateJWT);
app.use(tracks);
app.use(search);
// app.use(artists);

app.all("*", (req, res, next) => {
  next(new appError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(port, console.log(`server listening at port ${port}`));
