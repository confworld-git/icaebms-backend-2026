import express from "express";
import { authorization } from "../middleware/middleware.js";
import {
  enquiry_GetAll,
  enquiry_Create,
  enquiry_Delete,
} from "../controller/enquiry.controllers.js";

const enquiry = express.Router();

enquiry.get("/enquiry", authorization, enquiry_GetAll);
enquiry.post("/enquiry", enquiry_Create);
enquiry.delete("/enquiry", enquiry_Delete);

export default enquiry;
