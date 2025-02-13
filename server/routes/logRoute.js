const logRoute = (req, res, next) => {
  console.log('Incoming request route:', req.originalUrl);
  next(); // Call the next middleware or route handler
};

module.exports = logRoute;
