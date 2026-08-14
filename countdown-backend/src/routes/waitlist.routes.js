const express = require ("express");
const prisma = require ("../lib/prisma");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { firstname, email } = req.body;

        if (!firstname || !email) {
            return res.status(400).json({
                success: false,
                meassage: "First name and email are required"
            });
        }

        const existingUser = await prisma.waitlist.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "This email is already on the waitlist"
            });
        }

        const subscriber = await prisma.waitlist.create({
            data: {
                firstname,
                email
            }
        });

        return res.status(201).json({
            success: true,
            message: "You have successfully joined the waitlst!",
            data: subscriber
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

module.exports = router;