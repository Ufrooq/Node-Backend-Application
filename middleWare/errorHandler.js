const { constants } = require("../constants");
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res
        .status(statusCode)
        .json({ title: "Validation Error", message: error.message });
    case constants.NOT_FOUND:
      res
        .status(statusCode)
        .json({ title: "Not found", message: error.message });
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized Access Forbidden",
        message: error.message,
      });
    case constants.FORBIDDEN:
      res
        .status(statusCode)
        .json({ title: "Forbidden ", message: error.message });
    case constants.SERVER_ERROR:
      res
        .status(statusCode)
        .json({ title: "Server Error ", message: error.message });
    default:
      console.log("No Error all good !! ");
      break;
  }
};

module.exports = errorHandler;
