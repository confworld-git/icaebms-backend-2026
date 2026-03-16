import transporter from "../config/smtp.config.js";

import dotenv from "dotenv";
dotenv.config();

export const mail = async (subject, htmlContent, attachment, to_mail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to_mail || process.env.EMAIL_USER,
      subject: subject,
      html: htmlContent,
      attachments: attachment,
    };
    const data = await transporter.sendMail(mailOptions);
    console.log("Email sent to admin:", data.response);
  } catch (error) {
    console.log(error);
  }
};
