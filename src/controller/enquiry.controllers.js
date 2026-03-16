import Enquiry from "../Schema/enquiry.schema.js";
import { mail } from "../utils/smtp.js";
import enquiry_email from "../utils/emailTemplates/enquiry.js";

export const enquiry_GetAll = async (req, res) => {
  try {
    const enquiry = await Enquiry.find();
    res.status(200).json({
      message: "Get all enquiry successfully",
      data: enquiry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const enquiry_Create = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    mail(
      "New Enquiry from ICAEBMS-2026",
      enquiry_email(enquiry),
      null,
      "info@icaebms.com"
    );
    res.status(201).json({ message: "Enquiry Submit successfully" });
  } catch (error) {
    console.error("Error saving contact data:", error);
    res.status(500).json({ message: "Failed to Submit Enquiry" });
  }
};

export const enquiry_Delete = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({
      message: "Delete contact successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
