const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, message }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("EMAIL DEMO MODE");
      console.log("To:", to);
      console.log("Subject:", subject);
      console.log("Message:", message);
      return true;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Mr.Task" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message
    });

    return true;
  } catch (error) {
    console.log("Email failed:", error.message);
    return false;
  }
};

module.exports = { sendEmail };