import Deadline from "../Schema/deadline.schema.js";

export const deadline_GetAll = async (req, res) => {
  try {
    const deadlines = await Deadline.find();
    res.status(200).json({ success: true, message: "Get all successfully", data: deadlines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const deadline_GetById = async (req, res) => {
  try {
    const deadline = await Deadline.findById(req.params.id);
    if (!deadline) {
      return res.status(404).json({ success: false, message: "Deadline not found" });
    }
    res.status(200).json({ success: true, message: "Get by id successfully", data: deadline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const deadline_Create = async (req, res) => {
  try {
    const deadline = await Deadline.create(req.body);
    res.status(201).json({ success: true, message: "Create successfully", data: deadline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const deadline_Update = async (req, res) => {
  try {
    const deadline = await Deadline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!deadline) {
      return res.status(404).json({ success: false, message: "Deadline not found" });
    }
    res.status(200).json({ success: true, message: "Update successfully", data: deadline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const deadline_Delete = async (req, res) => {
  try {
    const deadline = await Deadline.findByIdAndDelete(req.params.id);
    if (!deadline) {
      return res.status(404).json({ success: false, message: "Deadline not found" });
    }
    res.status(200).json({ success: true, message: "Delete successfully", data: deadline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
