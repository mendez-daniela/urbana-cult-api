const logger = (req, res, next) => {
  const ahora = new Date().toLocaleString();
  console.log(`[${ahora}] ${req.method} ${req.url}`);
  next();
};

module.exports = logger;