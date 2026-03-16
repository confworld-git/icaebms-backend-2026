import Coupon from "../Schema/coupon.schema.js";

export const validate_Coupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon)
      return res.status(404).json({ success: false, message: "Invalid or inactive coupon code." });
    if (coupon.expiresAt && new Date() > coupon.expiresAt)
      return res.status(400).json({ success: false, message: "Coupon has expired." });
    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit)
      return res.status(400).json({ success: false, message: "Coupon usage limit reached." });

    return res.status(200).json({
      success: true,
      discountPercent: coupon.discountPercent,
      message: `Coupon applied! ${coupon.discountPercent}% discount.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const coupon_GetAll = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const coupon_Create = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const coupon_Update = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) return res.status(404).json({ success: false, message: "Coupon not found" });
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const coupon_Delete = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};