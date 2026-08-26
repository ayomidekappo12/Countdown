// business logic.

const prisma = require("../lib/prisma");

const {
  sendSubscriberConfirmation,
  sendAdminNotification,
} = require("./email.service");

const createWaitlistEntry = async ({ firstName, email }) => {
  // Check whether the email already exists
  const existingSubscriber = await prisma.waitlist.findUnique({
    where: { email },
  });

  if (existingSubscriber) {
    const error = new Error("This email is already on the waitlist.");

    error.statusCode = 409;

    throw error;
  }

  // Create the database record first
  let subscriber;

  try {
    subscriber = await prisma.waitlist.create({
      data: {
        firstName,
        email,
      },
    });
  } catch (error) {
    // Handle Prisma unique constraint race condition
    if (error.code === "P2002") {
      const duplicateError = new Error(
        "This email is already on the waitlist.",
      );

      duplicateError.statusCode = 409;

      throw duplicateError;
    }

    throw error;
  }

  // Email failures should not undo a successful signup
  try {
    await sendSubscriberConfirmation({
      firstName: subscriber.firstName,
      email: subscriber.email,
    });
  } catch (error) {
    console.error("Failed to send subscriber confirmation:", error);
  }

  try {
    await sendAdminNotification({
      firstName: subscriber.firstName,
      email: subscriber.email,
      createdAt: subscriber.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to send admin notification:", error);
  }

  return subscriber;
};

module.exports = {
  createWaitlistEntry,
};