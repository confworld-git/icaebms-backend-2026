import mongoose from "mongoose";
import Registration from "../Schema/registration.schema.js";
// import razorpay from "../config/payment_gateway.config.js";
// import { mail } from "../utils/smtp.js";
// import registration_email from "../utils/emailTemplates/registration.js";
// import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import razorpay from '../config/payment-gateway.config.js'
import Coupon from "../Schema/coupon.schema.js";

export const registration_GetAll = async (req, res) => {
  try {
    const result = await Registration.find();
    console.log(result)
    res.status(200).json({
      message: "Get all registrations successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get all registrations",
      error: error.message,
    });
  }
};

export const registration_GetById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Registration.findById(id);
    if (!result) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }
    res.status(200).json({
      message: "Get registration by id successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get registration by id",
      error: error.message,
    });
  }
};

// export const registration_Create = async (req, res) => {
//   try {
//     const order = await razorpay.orders.create({
//       amount: req.body.selectedFee * 100,
//       currency: "USD",
//       receipt: `receipt_${new mongoose.Types.ObjectId()}`,
//     });

//     const result = await Registration.create({
//       ...req.body,
//       Razorpay_amount: order.amount,
//       currency: order.currency,
//       receipt: order.receipt,
//       status: order.status,
//       id: order.id,
//     });

//     const data = await result.save();

//     mail(

//       registration_email(data),
//       null,

//     );

//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Failed to create registration",
//       error: error.message,
//     });
//   }
// };
// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

export const registration_Create = async (req, res) => {
  try {
    console.log(req.body);
    
const Amount = (req.body.selectedFee.finalTotal * 100).toFixed();

    const order = await razorpay.orders.create({
      amount: Amount,
      currency: "USD",
      payment_capture: 1,
      receipt: `receipt_${new mongoose.Types.ObjectId()}`,
    });
    const registration = new Registration({
      ...req.body,
      Razorpay_amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      id: order.id,
    });
    await registration.save();
    if (req.body.selectedFee.couponCode) {
  await Coupon.findOneAndUpdate(
    { code: req.body.selectedFee.couponCode.toUpperCase() },
    { $inc: { usedCount: 1 } }
  );
}
    const HtmlTemplate = ` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f9fc; margin: 0; padding: 20px;">
    <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); padding: 40px; max-width: 600px; margin: auto; border-top: 5px solid #6a5acd;">
        <h2 style="color: #6a5acd; font-size: 26px; margin-bottom: 15px;">New Registration from ICAEBMS-2026</h2>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Title:</span> ${
          registration.Title
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Full Name:</span> ${
          registration.first_name
        } ${registration.last_name}</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Payment Status:</span> ${
          order.status
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Certificate Name:</span> ${
          registration.certificate_name
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Date of Birth:</span> ${new Date(
          registration.DOB
        ).toLocaleDateString()}</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Nationality:</span> ${
          registration.nationality
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Department:</span> ${
          registration.department
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Institution:</span> ${
          registration.institution
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Mobile Number:</span> ${
          registration.number
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Email:</span> <a href="mailto:${
          registration.email
        }" style="color: #6a5acd; text-decoration: none;">${
      registration.email
    }</a></p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Participant Category:</span> ${
          registration.participant_category
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Presentation Category:</span> ${
          registration.presentation_Category
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Presentation Type:</span> ${
          registration.presentation_Type
        }</p>

        <div style="height: 1px; background-color: #e0e0e0; margin: 20px 0;"></div>

        <h3 style="color: #6a5acd; font-size: 22px;">Selected Fee Details</h3>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Fee Category:</span> ${
          registration.selectedFee.category
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Fee Type:</span> ${
          registration.selectedFee.type
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Title:</span> ${
          registration.selectedFee.title
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Amount:</span> $${
          registration.selectedFee.value
        }</p>

        ${
          registration.Razorpay_Payment_Details
            ? `
        <div style="height: 1px; background-color: #e0e0e0; margin: 20px 0;"></div>
        <h3 style="color: #6a5acd; font-size: 22px;">Payment Details</h3>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Order ID:</span> ${
          registration.order_id
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Payment Status:</span> ${
          registration.status
        }</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 10px;"><span style="font-weight: bold;">Payment Details:</span> ${JSON.stringify(
          registration.Razorpay_Payment_Details
        )}</p>
        `
            : ""
        }
        
        <div style="height: 1px; background-color: #e0e0e0; margin: 20px 0;"></div>

        <a href="mailto:${
          registration.Email
        }" style="display: inline-block; padding: 12px 20px; margin-top: 20px; background-color: #6a5acd; color: #ffffff; border-radius: 5px; text-decoration: none; transition: background-color 0.3s ease;">Reply to Participant</a>
    </div>
</body>
</html>
`;
    res.status(201).send({
      message: "Registration data saved successfully",
      order_id: order.id,
      amount: order.amount,
    });
    sendEmailToAdmin("New Registration from ICAEBMS-2026", HtmlTemplate);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error saving registration data",
      error: error.message,
    });
  }
};

const sendEmailToAdmin = async (subject, htmlContent, attachment) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: process.env.ADMIN_MAIL,
      subject: subject,
      html: htmlContent,
      attachments: attachment,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin:", process.env.ADMIN_MAIL);
  } catch (error) {
    console.error("Error sending email to admin:", error);
  }
};

const sendEmailToUser = async (subject, htmlContent, Email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: Email,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to User:", Email);
  } catch (error) {
    console.error("Error sending email to User:", error);
  }
};
