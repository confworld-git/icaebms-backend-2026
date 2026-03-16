import multer from "multer";
import jwt from "jsonwebtoken";
import Admin from "../Schema/admin.js";
import dotenv from "dotenv";
dotenv.config();

export const middlelog = (req, res, next) => {
  console.warn(`[${req.method}] ${req.originalUrl}`);
  next();
};

export const multer_file = multer();

export const authorization = async (req, res, next) => {
  try {
    if (!req.cookies.auth_token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    const decoded = jwt.verify(req.cookies.auth_token, process.env.KEY);
    const user = await Admin.find({ email: decoded.email });
    if (!user && user.email !== decoded.email)
      return res.status(401).json({ message: "Access denied. Invalid token." });
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Unauthorized" });
  }
};
