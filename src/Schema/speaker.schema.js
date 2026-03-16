import mongoose from "mongoose";

const speaker = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Section: {
    type: String,
    enum: [
      "Welcome Address",
      "Guest of Honour",
      "Conference Chair",
      "Keynote Speakers",
      "Session Speakers",
      "Session Chairs",
      "Scientific Committee",
      "Review Committee",
    ],
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  About: {
    type: [String],
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

const Speaker = mongoose.model("Speaker", speaker);

export default Speaker;
