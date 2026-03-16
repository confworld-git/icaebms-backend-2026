import crypto from "crypto";
// import Payment from '../schema/payment.schema.js'
import razorpay from "../config/payment-gateway.config.js";
import Registration from "../Schema/registration.schema.js";

// export const payment_validate = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       Order_ID,
//     } = req.body;
    
//     const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//     sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = sha.digest("hex");

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ msg: "Transaction is not legit!" });
//     }

//     const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

//     const registrationData = await Registration.findOne({ id: razorpay_order_id });

//     if (registrationData) {
//       registrationData.status = "Payment Paid";
//       await registrationData.save();
      
//       // Fix: Create new payment document properly
//       const paymentData = new Payment(paymentDetails);
//       await paymentData.save();

//       return res.status(200).json({
//         msg: "Payment validated and registration updated successfully!",
//       });
//     } else {
//       return res.status(404).json({ msg: "Registration not found." });
//     }
//   } catch (error) {
//     console.error("Error during payment validation:", error);
//     return res
//       .status(500)
//       .json({ msg: "Internal Server Error", error: error.message });
//   }
// };
export const payment_validate = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, Order_ID } = req.body;

    // 1. Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // 2. Verify payment with Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    
    if (payment.status !== 'captured') {
      return res.status(400).json({ success: false, message: "Payment not captured" });
    }

    // 3. Update registration
    await Registration.findOneAndUpdate(
      { id: Order_ID },
      { 
        status: 'completed',
        payment_id: razorpay_payment_id,
        payment_status: 'success'
      }
    );

    return res.json({ 
      success: true,
      message: "Payment validated successfully"
    });

  } catch (error) {
    console.error("Validation error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error"
    });
  }
};
export const payment_cancel = async (req, res) => {
  try {
    const { order_id } = req.body;
    const registrationData = await Registration.findOne({ id: order_id });

    if (registrationData) {
      registrationData.status = "Payment Cancelled";
      await registrationData.save();
      return res.status(200).json({ msg: "Payment Cancelled" });
    } else {
      return res.status(404).json({ msg: "Registration not found." });
    }
  } catch (error) {
    console.error("Error updating payment cancellation:", error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const payment_verify = async (req, res) => {
  const { payment_id, order_id, signature } = req.body;
  let registrationData;
  
  try {
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${order_id}|${payment_id}`);
    const digest = sha.digest("hex");
    
    if (digest !== signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    // Fix: Use razorpay instance instead of undefined 'instance'
    const registrationDetails = await razorpay.payments.fetch(payment_id);

    registrationData = await Registration.findOne({ order_id: order_id });
    
    if (registrationData) {
      registrationData.status = "Payment Success";
      registrationData.Razorpay_Payment_Details = registrationDetails;
      await registrationData.save();
      
      return res.status(200).json({
        msg: "Payment validated and registration updated successfully!",
      });
    } else {
      return res.status(404).json({ msg: "Registration not found." });
    }
  } catch (error) {
    console.error("Error during payment validation:", error);
    
    // Fix: Only update status if registrationData exists
    if (registrationData) {
      registrationData.status = "Payment Failed";
      await registrationData.save();
    }
    
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};