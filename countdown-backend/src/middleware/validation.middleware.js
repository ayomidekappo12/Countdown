const validateWaitlist = (req, res, next) => {
    const { firstName, email } = req.body;
    if (!firstName || !email) {
        return res.status(400).json({ 
            success: false, 
            message: 'first name and email are required .'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address."
        });
    }

    if (firstName.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "First name must contain at least 2 characters."
        });
    }

    // clean the data before passing it to the controller
    req.body.firstName = firstName.trim();
    req.body.email = email.trim();

    next();
};

module.exports = {
    validateWaitlist
};