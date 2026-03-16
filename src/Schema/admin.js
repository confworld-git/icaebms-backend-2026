import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({ // Renamed 'admin' to 'adminSchema' for clarity
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// The FIX: Check if the model already exists before compiling it
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;