// business logic.

const prisma = require('../lib/prisma');

const {
    sendSubscriberConfirmation,
    sendAdminNotification
} = require('./email.service');

const createWaitlistEntry = async ({ firstName, email }) => {
    // check whether email already exists
    const existingSubscriber = await prisma.waitlist.findUnique({
        where: { email }
    });

    if (existingSubscriber) {
        const error = new Error("This email is already on the waitlist.");
        error.statusCode = 409;
        throw error;
    }

    // create database record
    const subscriber = await prisma.waitlist.create({
        data: {
            firstName,
            email
        }
    });
    
    // send confirmation email to subscriber
    await sendSubscriberConfirmation({
        firstName: subscriber.firstName,
        email: subscriber.email
    });

    // send notification email to admin
    await sendAdminNotification({
        firstName: subscriber.firstName,
        email: subscriber.email,
        createdAt: subscriber.createdAt.toISOString()
    });

    return subscriber;
}

module.exports = {
    createWaitlistEntry
};