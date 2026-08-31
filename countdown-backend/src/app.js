const express = require("express");
const cors = require("cors");

const waitlistRoutes = require("./routes/waitlist.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const allowedOrigins = new Set(
  [process.env.FRONTEND_URL, "http://localhost:3000", "http://127.0.0.1:3000"]
    .filter(Boolean)
    .map((origin) => origin.replace(/\/$/, "")),
);

// Parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin.replace(/\/$/, ""))) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// API root
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Countdown API is running",
    version: "1.0.0",
  });
});

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
