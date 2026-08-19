require("dotenv").config();

const app = require("./app");
const prisma = require("./lib/prisma");

const { verifyEmailConnection } = require("./services/email.service");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully.");

    await verifyEmailConnection();

    console.log("Email connection verified successfully.");

    app.listen(PORT, () => {
      console.log(`Countdown API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);

    process.exit(1);
  }
};

startServer();