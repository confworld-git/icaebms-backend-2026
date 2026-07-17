import crypto from "crypto";
import razorpay from "../config/payment-gateway.config.js";
import Registration from "../Schema/registration.schema.js";

// Helper to verify a Razorpay signature and return { valid, registration }
const verifyAndFetchRegistration = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return { valid: false, reason: "missing_fields" };
  }

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return { valid: false, reason: "invalid_signature" };
  }

  // Fetch payment to confirm status with Razorpay
  let payment;
  try {
    payment = await razorpay.payments.fetch(razorpay_payment_id);
  } catch (err) {
    console.error("Failed to fetch payment from Razorpay:", err);
    return { valid: false, reason: "fetch_failed" };
  }

  // Find the matching registration by razorpay order id (stored as `id` in schema)
  const registration = await Registration.findOne({ id: razorpay_order_id });
  if (!registration) {
    return { valid: false, reason: "registration_not_found", payment };
  }

  return { valid: true, registration, payment };
};

export const payment_validate = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const { valid, reason, registration, payment } =
      await verifyAndFetchRegistration({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

    if (!valid) {
      const status = reason === "invalid_signature" ? 400 : 404;
      return res
        .status(status)
        .json({
          success: false,
          message: `Payment validation failed: ${reason}`,
        });
    }

    if (payment.status !== "captured" && payment.status !== "authorized") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not captured" });
    }

    // Persist payment + status on the registration document
    registration.status = "Payment Paid";
    registration.payment_id = razorpay_payment_id;
    registration.payment_status = "success";
    registration.Razorpay_Payment_Details = payment;
    await registration.save();

    return res.json({
      success: true,
      message: "Payment validated successfully",
    });
  } catch (error) {
    console.error("Validation error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const payment_cancel = async (req, res) => {
  try {
    const { order_id } = req.body;

    if (!order_id) {
      return res
        .status(400)
        .json({ success: false, message: "order_id is required" });
    }

    const registrationData = await Registration.findOne({ id: order_id });
    if (!registrationData) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found." });
    }

    registrationData.status = "Payment Cancelled";
    await registrationData.save();
    return res
      .status(200)
      .json({ success: true, message: "Payment Cancelled" });
  } catch (error) {
    console.error("Error updating payment cancellation:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

export const payment_verify = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  let registrationData;

  try {
    // Support both { order_id, payment_id, signature } and the razorpay_* field names
    const razorpay_order_id = order_id || req.body.razorpay_order_id;
    const razorpay_payment_id = payment_id || req.body.razorpay_payment_id;
    const razorpay_signature = signature || req.body.razorpay_signature;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Transaction is not legit!" });
    }

    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    // `id` field stores the razorpay order id (see registration_Create)
    registrationData = await Registration.findOne({ id: razorpay_order_id });

    if (registrationData) {
      registrationData.status = "Payment Paid";
      registrationData.payment_id = razorpay_payment_id;
      registrationData.payment_status = "success";
      registrationData.Razorpay_Payment_Details = paymentDetails;
      await registrationData.save();

      return res.status(200).json({
        success: true,
        message: "Payment validated and registration updated successfully!",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found." });
    }
  } catch (error) {
    console.error("Error during payment validation:", error);

    if (registrationData) {
      try {
        registrationData.status = "Payment Failed";
        await registrationData.save();
      } catch (saveErr) {
        console.error("Failed to mark registration as failed:", saveErr);
      }
    }

    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
