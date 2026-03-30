import PaperSubmission from "../Schema/paper_submission.schema.js";
import { mail } from "../utils/smtp.js";
import paper_submission_lead from "../utils/emailTemplates/paper_submission.js";
import paper_submission_reply from "../utils/emailTemplates/paper_submission_reply.js";

export const paper_submission_GetAll = async (req, res) => {
  try {
    const paperSubmissions = await PaperSubmission.find();
    res.status(200).json({
      message: "Get all paper submissions successfully",
      data: paperSubmissions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching paper submissions" });
  }
};

export const paper_submission_GetById = async (req, res) => {
  try {
    const id = req.params.id;
    const paperSubmission = await PaperSubmission.findById(id);
    if (!paperSubmission) {
      return res.status(404).json({ message: "Paper submission not found" });
    }
    res.status(200).json({
      message: "Get paper submission by id successfully",
      data: paperSubmission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching paper submission" });
  }
};

export const paper_submission_Create = async (req, res) => {
  try {
    const paperSubmission = new PaperSubmission({
      ...req.body,
      file: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        buffer: req.file.buffer,
      },
    });
    const data = await paperSubmission.save();

    const attachment = [
      {
        filename: data.file.originalname,
        content: data.file.buffer,
        contentType: data.file.mimetype,
      },
    ];
    mail(
      "New Paper Submission from ICAEBMS-2026",
      paper_submission_lead(data),
      attachment,
    );
    // reply mail
    mail(
      "New Paper Submission from ICAEBMS-2026",
      paper_submission_reply(data),
      null,
      data.correspondingEmail
    );
    res.status(201).json({ message: "Paper Submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating paper submission" });
  }
};
