import Admin from "../Schema/admin.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import Registration from "../Schema/registration.schema.js";
import Contact from "../Schema/contact.schema.js";
import Download from "../Schema/download.schema.js";
import PaperSubmission from "../Schema/paper_submission.schema.js";
import Enquiry from "../Schema/enquiry.schema.js";
import CommitteeMember from "../Schema/committee_member.schema.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.find({ email: email });
    
    if (!user.length) {
      
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValidPassword = password === user[0].password;

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user[0].email }, process.env.KEY);

    // Set the token in a HTTP-only cookie
    res.cookie("auth_token", token, {
      httpOnly: true, // Prevent JavaScript access (XSS protection)
      secure: true, // Send only over HTTPS (set to false for local testing)
      sameSite: "Strict", // Helps prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
    });

    res.json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminProtected = async (req, res) => {
  try {
    if (!req.cookies.auth_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = jwt.verify(req.cookies.auth_token, process.env.KEY);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    res.json({ message: "Access granted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Dashboard_GetAllData = async (req, res) => {
  try {
    const paidRegistrations = await Registration.aggregate([
      [
        { $match: { status: { $regex: "Payment Paid", $options: "i" } } },
        { $group: { _id: null, totalAmount: { $sum: "$Razorpay_amount" } } },
      ],
    ]);

    const totalFee = (paidRegistrations[0]?.totalAmount / 100).toFixed(2) || 0;
    const Count_Registration = await Registration.countDocuments({});
    const Count_Submission = await PaperSubmission.countDocuments({});
    const Count_CommitteeMember = await CommitteeMember.countDocuments({});
    const Count_Contact = await Contact.countDocuments({});
    const Count_Download = await Download.countDocuments({});
    const Count_Enquiry = await Enquiry.countDocuments({});

    res.status(200).json({
      totalFee,
      Count_Registration,
      Count_Submission,
      Count_CommitteeMember,
      Count_Contact,
      Count_Download,
      Count_Enquiry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminLogout = async (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logged out successfully" });
};
