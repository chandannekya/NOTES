import { config as configDotenv } from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
configDotenv();

export const mailer = async (email: string, title: string, body: string) => {
  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `"NOTES" <${process.env.MAIL_USER}>`, // sender address
      to: email, // recipient
      subject: title, // email subject
      html: body, // email body
    });

    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending email: ${(error as Error).message}`);
    throw new Error("Failed to send email");
  }
};
