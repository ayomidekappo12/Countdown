const rateLimit = require("express-rate-limit");

const waitlistRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: "Too many signup attempts. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: 1,
});

module.exports = {
  waitlistRateLimiter,
};
