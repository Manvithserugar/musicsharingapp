const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  let status =
    err.status || (statusCode >= 400 && statusCode < 500 ? "fail" : "error");

  switch (err.name) {
    case "ValidationError":
      statusCode = 400;
      status = "fail";
      message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      break;
    case "CastError":
      statusCode = 400;
      status = "fail";
      message = `Invalid ${err.path}: ${err.value}.`;
      break;
    default:
      switch (err.code) {
        case 11000:
          statusCode = 409;
          status = "fail";
          message = `Duplicate field value: ${JSON.stringify(
            err.keyValue
          )}. Please use a different value.`;
          break;
        default:
          break;
      }
  }

  if (statusCode === 500) {
    console.error("Critical Error:", err);
    message = `Internal Server Error: ${message}`;
  }

  res.status(statusCode).json({
    status,
    message,
  });
};

module.exports = globalErrorHandler;
