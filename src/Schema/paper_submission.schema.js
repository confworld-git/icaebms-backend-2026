import mongoose from "mongoose";

const { Schema } = mongoose; // Destructure Schema here

const PaperSchema = new Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  buffer: { type: Buffer, required: true },
});

const paperSubmissionSchema = new Schema(
  {
    Submission_type: {
      type: String,
      required: true,
    },
    SubmissionID: {
      type: String,
      required: true,
    },
    paper_title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    CoAuthorName: {
      type: String,
      required: true,
    },
    correspondingEmail: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: false,
    },
    presentationCategory: {
      type: String,
      required: true,
    },
    presentationType: {
      type: String,
      required: true,
    },
    Institution_Name: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    Publication_Required: {
      type: Boolean,
      required: true,
    },
    file: {
      type: PaperSchema, // This is a sub-schema, it's fine as is
      required: true,
    },
    conferenceSource: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

// The FIX: Check if the model already exists before compiling it
const PaperSubmission = mongoose.models.PaperSubmission || mongoose.model("PaperSubmission", paperSubmissionSchema);

export default PaperSubmission;