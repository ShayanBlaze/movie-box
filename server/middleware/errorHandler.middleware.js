const errorHandler = (err, req, res, next) => {
  // if error has a specific status code, use it, otherwise 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // in development mode, show more error details
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
