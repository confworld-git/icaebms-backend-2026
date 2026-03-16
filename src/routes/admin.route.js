import express from "express";
import { multer_file, authorization } from "../middleware/middleware.js";
import {
  adminLogin,
  adminProtected,
  Dashboard_GetAllData,
  adminLogout,
} from "../controller/admin.controllers.js";

const admin = express.Router();

admin.post("/login", multer_file.none(), adminLogin);
admin.get("/protected", adminProtected);
admin.get("/dashboard", authorization, Dashboard_GetAllData);
admin.get("/logout", adminLogout);

export default admin;
