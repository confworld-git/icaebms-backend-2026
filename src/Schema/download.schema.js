import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema( // Renamed 'download' to 'downloadSchema' for clarity
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Number: {
      type: String,
      required: true,
    },
    Link: {
      type: String,
      required: true,
    },
    Info: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// The FIX: Check if the model already exists before compiling it
const Download = mongoose.models.Download || mongoose.model("Download", downloadSchema);

export default Download;