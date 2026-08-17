const express = require("express");

const { createWaitlist } = require("../controllers/waitlist.controller");

const { validateWaitlist } = require("../middleware/validation.middleware");

const { waitlistRateLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post("/", waitlistRateLimiter, validateWaitlist, createWaitlist);

module.exports = router;
