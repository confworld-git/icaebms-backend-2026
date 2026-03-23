import mongoose from "mongoose";
import Registration from "../Schema/registration.schema.js";
import nodemailer from "nodemailer";
import razorpay from "../config/payment-gateway.config.js";
import Coupon from "../Schema/coupon.schema.js";

export const registration_GetAll = async (req, res) => {
  try {
    const result = await Registration.find();
    console.log(result);
    res.status(200).json({ message: "Get all registrations successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get all registrations", error: error.message });
  }
};

export const registration_GetById = async (req, res) => {
  try {
    const result = await Registration.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "Registration not found" });
    res.status(200).json({ message: "Get registration by id successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get registration by id", error: error.message });
  }
};

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

    // Increment coupon usage
    if (req.body.selectedFee.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: req.body.selectedFee.couponCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      );
    }

    // ── Build journal section for email ──────────────────────────────────────
    const sf = registration.selectedFee;

    const journalRow = sf.journalSupport?.tier
      ? `
        <div style="height:1px;background:#e0e0e0;margin:20px 0;"></div>
        <h3 style="color:#6a5acd;font-size:22px;">Journal Publication Support</h3>
        <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;">
          <span style="font-weight:bold;">Tier:</span> ${sf.journalSupport.tier}
        </p>
        <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;">
          <span style="font-weight:bold;">Package:</span> ${sf.journalSupport.package}
        </p>
        <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;">
          <span style="font-weight:bold;">Amount:</span> $${sf.journalSupport.amount}
        </p>
      `
      : "";

    // ── Build addons section for email ────────────────────────────────────────
    const addonsRows =
      sf.addons?.length > 0
        ? `
        <div style="height:1px;background:#e0e0e0;margin:20px 0;"></div>
        <h3 style="color:#6a5acd;font-size:22px;">Add-ons</h3>
        ${sf.addons
          .map(
            (a) => `<p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:6px;">
                      • ${a.label}${a.sublabel ? ` (${a.sublabel})` : ""}: <strong>$${a.amount}</strong>
                    </p>`
          )
          .join("")}
        <p style="color:#333;font-size:16px;margin-top:8px;">
          <span style="font-weight:bold;">Add-ons Total:</span> $${sf.addonsAmount}
        </p>
      `
        : "";

    const HtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f7f9fc;margin:0;padding:20px;">
  <div style="background:#fff;border-radius:10px;box-shadow:0 8px 20px rgba(0,0,0,0.1);padding:40px;max-width:600px;margin:auto;border-top:5px solid #6a5acd;">
    <h2 style="color:#6a5acd;font-size:26px;margin-bottom:15px;">New Registration from ICAEBMS-2026</h2>

    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Title:</span> ${registration.Title}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Full Name:</span> ${registration.first_name} ${registration.last_name}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Payment Status:</span> ${order.status}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Certificate Name:</span> ${registration.certificate_name}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Date of Birth:</span> ${new Date(registration.DOB).toLocaleDateString()}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Nationality:</span> ${registration.nationality}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Department:</span> ${registration.department}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Institution:</span> ${registration.institution}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Mobile Number:</span> ${registration.number}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Email:</span> <a href="mailto:${registration.email}" style="color:#6a5acd;">${registration.email}</a></p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Participant Category:</span> ${registration.participant_category}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Presentation Category:</span> ${registration.presentation_Category}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Presentation Type:</span> ${registration.presentation_Type}</p>

    <div style="height:1px;background:#e0e0e0;margin:20px 0;"></div>
    <h3 style="color:#6a5acd;font-size:22px;">Selected Fee Details</h3>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Fee Category:</span> ${sf.category}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Title:</span> ${sf.title}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Base Registration Fee:</span> $${sf.registrationBase || sf.value}</p>

    ${journalRow}
    ${addonsRows}

    <div style="height:1px;background:#e0e0e0;margin:20px 0;"></div>
    <h3 style="color:#6a5acd;font-size:22px;">Pricing Summary</h3>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Membership:</span> ${sf.membershipSelected ? `Yes (+$${sf.membershipFee})` : "No"}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Coupon:</span> ${sf.couponCode || "None"}</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Discount Applied:</span> ${sf.discountApplied}%</p>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:10px;"><span style="font-weight:bold;">Bank Convenience Charge:</span> $${sf.convenience_price}</p>
    <p style="color:#333;font-size:18px;font-weight:bold;line-height:1.6;margin-bottom:10px;">Total Charged: $${sf.finalTotal}</p>

    <a href="mailto:${registration.email}" style="display:inline-block;padding:12px 20px;margin-top:20px;background:#6a5acd;color:#fff;border-radius:5px;text-decoration:none;">Reply to Participant</a>
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
    res.status(500).send({ message: "Error saving registration data", error: error.message });
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
    await transporter.sendMail({
      from:        process.env.ADMIN_MAIL,
      to:          process.env.ADMIN_MAIL,
      subject,
      html:        htmlContent,
      attachments: attachment,
    });
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
    await transporter.sendMail({
      from:    process.env.ADMIN_MAIL,
      to:      Email,
      subject,
      html:    htmlContent,
    });
    console.log("Email sent to User:", Email);
  } catch (error) {
    console.error("Error sending email to User:", error);
  }
};