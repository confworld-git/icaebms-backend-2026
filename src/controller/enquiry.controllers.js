import Enquiry from "../Schema/enquiry.schema.js";
import { mail } from "../utils/smtp.js";
import enquiry_email from "../utils/emailTemplates/enquiry.js";

export const enquiry_GetAll = async (req, res) => {
  try {
    const enquiry = await Enquiry.find();
    res.status(200).json({
      success: true,
      message: "Get all enquiries successfully",
      data: enquiry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const enquiry_Create = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    mail(
      "New Enquiry from WCMRP-2027",
      enquiry_email(enquiry),
      null,
      "info@wcmrp.com"
    );
    res.status(201).json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error("Error saving enquiry data:", error);
    res.status(500).json({ success: false, message: "Failed to submit enquiry", error: error.message });
  }
};

export const enquiry_Delete = async (req, res) => {
  try {
    const id = req.params.id;
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
