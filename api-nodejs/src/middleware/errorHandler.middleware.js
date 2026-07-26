function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const responseMessage = status === 500 ? "Server error" : err.message;

  console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${status}: ${err.message}`);

  res.status(status).json({ error: responseMessage });
}

module.exports = errorHandler;