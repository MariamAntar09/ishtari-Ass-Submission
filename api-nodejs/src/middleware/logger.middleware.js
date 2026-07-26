function requestLogger(req, res, next) {
  const startTime = Date.now();

  res.on("finish", () => {
    const elapsedTime = Date.now() - startTime;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${elapsedTime}ms)`);
  });

  next();
}

module.exports = requestLogger;