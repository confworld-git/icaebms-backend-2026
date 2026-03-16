import mongoose from "mongoose";

const deadline = new mongoose.Schema({
  Deadline_Title: { type: String, required: true },
  Date: { type: String, required: true },
  Super_Script: { type: String, required: true },
});

const Deadline = mongoose.model("Deadline", deadline);

export default Deadline;
