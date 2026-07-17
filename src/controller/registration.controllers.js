import mongoose from "mongoose";
import Registration from "../Schema/registration.schema.js";
import nodemailer from "nodemailer";
import razorpay from "../config/payment-gateway.config.js";
import Coupon from "../Schema/coupon.schema.js";

export const registration_GetAll = async (req, res) => {
  try {
    const result = await Registration.find();
    res.status(200).json({ success: true, message: "Get all registrations successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get all registrations", error: error.message });
  }
};

export const registration_GetById = async (req, res) => {
  try {
    const result = await Registration.findById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Registration not found" });
    res.status(200).json({ success: true, message: "Get registration by id successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get registration by id", error: error.message });
  }
};

export const registration_Create = async (req, res) => {
  try {
    console.log("Incoming registration payload:", JSON.stringify(req.body, null, 2));

    // ── Basic validation ──────────────────────────────────────────────────────
    const required = [
      "Title",
      "first_name",
      "last_name",
      "certificate_name",
      "DOB",
      "nationality",
      "department",
      "institution",
      "number",
      "email",
      "presentation_Category",
      "presentation_Type",
      "participant_category",
      "Terms_and_Conditions",
    ];
    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }
    if (!req.body.selectedFee || !req.body.selectedFee.finalTotal) {
      return res.status(400).json({
        success: false,
        message: "Missing selected fee information",
      });
    }

    // ── Calculate amount in paise (Razorpay expects integer) ────────────────
    // Use Math.round to avoid floating-point precision issues, then cast to int
    const Amount = Math.round(Number(req.body.selectedFee.finalTotal) * 100);
    if (!Number.isFinite(Amount) || Amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fee amount",
      });
    }

    // ── Create Razorpay order ────────────────────────────────────────────────
    const order = await razorpay.orders.create({
      amount: Amount,
      currency: "USD",
      payment_capture: 1,
      receipt: `receipt_${new mongoose.Types.ObjectId()}`,
    });

    // ── Save registration with order metadata ────────────────────────────────
    const registration = new Registration({
      ...req.body,
      Razorpay_amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status, // "created" by Razorpay
      id: order.id,         // store razorpay order id for later lookup
    });

    await registration.save();

    // ── Increment coupon usage (best effort) ─────────────────────────────────
    if (req.body.selectedFee.couponCode) {
      try {
        await Coupon.findOneAndUpdate(
          { code: req.body.selectedFee.couponCode.toUpperCase() },
          { $inc: { usedCount: 1 } }
        );
      } catch (couponErr) {
        console.error("Failed to increment coupon usage:", couponErr);
      }
    }

    res.status(201).json({
      success: true,
      message: "Registration data saved successfully",
      order_id: order.id,
      amount: order.amount,
    });
  } catch (error) {
    console.log("registration_Create error:", error);
    res.status(500).json({
      success: false,
      message: "Error saving registration data",
      error: error.message,
    });
  }
};


