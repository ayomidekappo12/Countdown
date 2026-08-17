const {
    createWaitlistEntry
} = require('../services/waitlist.service');

const createWaitlist = async (req, res) => {
    try {
        const { firstName, email } = req.body;
        const subscriber = await createWaitlistEntry({ firstName, email });
        return res.status(201).json({
            success: true,
            message: "You have successfully joined the countdown waitlist 🎉",
            data: {
                id: subscriber.id,
                firstName: subscriber.firstName,
                email: subscriber.email,
                createdAt: subscriber.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createWaitlist
};