require("dotenv").config();

const app = require("./app");
const prisma = require("./lib/prisma");

const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Countdown API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);

    process.exit(1);
  }
};

startServer();
