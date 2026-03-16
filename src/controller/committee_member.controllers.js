import CommitteeMember from "../Schema/committee_member.schema.js";
import { mail } from "../utils/smtp.js";
import committee_member_email from "../utils/emailTemplates/committee_member.js";
export const CommitteeMember_GetAll = async (req, res) => {
  try {
    const committeeMembers = await CommitteeMember.find();
    res.status(200).json({
      message: "Get all committee member successfully",
      data: committeeMembers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const CommitteeMember_Create = async (req, res) => {
  try {
    const committeeMember = new CommitteeMember({
      ...req.body,
      Uploaded_File: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        buffer: req.file.buffer,
      },
    });
    await committeeMember.save();
    const attachment = [
      {
        filename: committeeMember.Uploaded_File.originalname,
        content: committeeMember.Uploaded_File.buffer,
        contentType: committeeMember.Uploaded_File.mimetype,
      },
    ];
    mail(
      "New Committee Member from ICAEBMS-2026",
      committee_member_email(committeeMember),
      attachment,
      "info@icaebms.com"
    );
    res.status(201).json({
      message: "Form Submitted successfully",
      data: committeeMember,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const CommitteeMember_Delete = async (req, res) => {
  try {
    const committeeMemberId = req.params.id;
    const committeeMember = await CommitteeMember.findByIdAndDelete(
      committeeMemberId
    );
    if (!committeeMember) {
      return res.status(404).json({ message: "Committee member not found" });
    }
    res.status(200).json({ message: "Delete committee member successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
