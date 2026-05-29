import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email,
  token
) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("Sending email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink =
      `http://localhost:3000/users/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `
        <h2>Verify Your Email</h2>
        <p>Click link below:</p>
        <a href="${verificationLink}">
          Verify Email
        </a>
      `,
    };

    const info = await transporter.sendMail(
      mailOptions
    );

    console.log("EMAIL SENT:", info.messageId);
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw err;
  }
};