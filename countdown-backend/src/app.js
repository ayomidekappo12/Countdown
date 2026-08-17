const express = require("express");
const cors = require("cors");

const waitlistRoutes = require("./routes/waitlist.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Countdown API is running",
  });
});

// Waitlist routes
app.use("/api/waitlist", waitlistRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
