import mongoose from "mongoose";

const enquiry = new mongoose.Schema(
  {
    User_Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    Contact_Number: {
      type: String,
      required: true,
    },
    Preferred_Contact_Time: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
    },
    Message: {
      type: String,
    },
    Help_Description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquiry);

export default Enquiry;
