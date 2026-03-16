import Speaker from "../Schema/speaker.schema.js";
import Image from "../Schema/image.schema.js";

export const speaker_GetAll = async (req, res) => {
  try {
    let { s } = req.query;
    let data;
    if (s) {
      s = s.split(",");
      console.log(s);
      data = await Speaker.aggregate([
        { $match: { Section: { $in: s } } },
        { $group: { _id: "$Section", speakers: { $push: "$$ROOT" } } },
      ]);
    } else {
      data = await Speaker.find().exec();
    }
    res.status(200).json({ message: "Get all speakers", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const speaker_GetById = async (req, res) => {
  try {
    const id = req.params.id;
    const speaker = await Speaker.findById(id);
    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }
    res.status(200).json({ message: "Get speaker by id", data: speaker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const speaker_Create = async (req, res) => {
  try {
    if (!req.file) {
      res.status(403).json({
        message: "Please upload a image",
      });
    } else {
      const image = new Image({
        title: req.body.Name,
        img: req.file.buffer,
        mimetype: req.file.mimetype,
      });
      await image.save();
      const speaker = new Speaker({
        ...req.body,
        Image: image._id,
      });
      await speaker.save();
      res
        .status(201)
        .json({ message: "Speaker Added Successfully", data: speaker });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const speaker_Update = async (req, res) => {
  try {
    const id = req.params.id;
    const speaker = await Speaker.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }
    res
      .status(200)
      .json({ message: "Speaker updated successfully", data: speaker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const speaker_Delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Speaker.findByIdAndDelete(id);
    res.status(200).json({ message: "Speaker deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

