import Contact from "../Schema/contact.schema.js";
import { mail } from "../utils/smtp.js";
import emailHtml from "../utils/emailTemplates/contact.js";

export const contact_GetAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      message: "Get all contacts successfully",
      data: contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const contact_GetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({
      message: "Got contact successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const contact_Create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    mail("New Contact from ICAEBMS-2026", emailHtml(contact));
    res.status(201).json({
      message: "Thank you for contacting us!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const contact_Update = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({
      message: "Updated contact successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const contact_Delete = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({
      message: "Deleted contact successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
