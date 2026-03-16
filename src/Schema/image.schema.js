import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: String,
  img: Buffer,
  mimetype: String,
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
