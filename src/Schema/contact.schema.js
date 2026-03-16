import mongoose from "mongoose";

const contactSchema = new mongoose.Schema( // Renamed 'contact' to 'contactSchema' for clarity
  {
    First_Name: {
      type: String,
      required: true,
    },
    Last_Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Contact_Number: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// The FIX: Check if the model already exists before compiling it
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;