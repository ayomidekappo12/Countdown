const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
    
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        replyTo: process.env.EMAIL_REPLY_TO
    }
});

const sendSubscriberConfirmation = async ({ firstName, email }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "You're on the waitlist! 🎉",
    text: `Hi ${firstName}, Thanks for joining our countdown waitlist! You're officially on the list. We'll notify you when we launch. Thanks, The Countdown Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>You're on the list 🎉</h2>

        <p>Hi ${firstName},</p>

        <p>
          Thanks for joining our countdown waitlist!
        </p>

        <p>
          You're officially on the list. We'll notify you
          as soon as we launch.
        </p>

        <p>
          Thanks,<br /> 
          <strong>The Countdown Team</strong>
        </p>
      </div>
    `,
  });
};

const sendAdminNotification = async ({ firstName, email, createdAt }) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: "New countdown waitlist signup",
        text: `New subscriber joined the countdown waitlist.\n\nName: ${firstName}\nEmail: ${email}\nSigned up date: ${createdAt}`,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Countdown Waitlist Signup</h2>

        <p>
          A new subscriber has joined your countdown waitlist.
        </p>

        <p>
          <strong>Name:</strong>
          ${firstName} ${lastName}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Date:</strong>
          ${createdAt}
        </p>
      </div>
    `
  });
};

module.exports = {
    sendSubscriberConfirmation,
    sendAdminNotification
};
