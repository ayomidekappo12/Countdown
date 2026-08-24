const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendSubscriberConfirmation = async ({ firstName, email }) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    replyTo: process.env.EMAIL_REPLY_TO,
    subject: "You're on the waitlist! 🎉",

    text: `
Hi ${firstName},

Thanks for joining our countdown waitlist!

You're officially on the list. We'll notify you when we launch.

Thanks,
The Countdown Team
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>You're on the list 🎉</h2>

        <p>Hi ${firstName},</p>

        <p>
          Thanks for joining our countdown waitlist!
        </p>

        <p>
          You're officially on the list. We'll notify you
          when we launch.
        </p>

        <p>
          Thanks,<br />
          <strong>The Countdown Team</strong>
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const sendAdminNotification = async ({ firstName, email, createdAt }) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    replyTo: process.env.EMAIL_REPLY_TO,
    subject: "New Countdown Waitlist Signup",

    text: `
New subscriber joined the countdown waitlist.

Name: ${firstName}
Email: ${email}
Signed up date: ${createdAt}
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Countdown Waitlist Signup</h2>

        <p>
          A new subscriber has joined your countdown waitlist.
        </p>

        <p>
          <strong>Name:</strong>
          ${firstName}
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
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  sendSubscriberConfirmation,
  sendAdminNotification,
};
