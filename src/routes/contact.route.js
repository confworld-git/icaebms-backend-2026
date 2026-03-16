import express from "express";
import { authorization } from "../middleware/middleware.js";
import {
  contact_GetAll,
  contact_Create,
  contact_Update,
  contact_Delete,
} from "../controller/contact.controllers.js";

const contact = express.Router();

contact.get("/contact", authorization, contact_GetAll);
contact.post("/contact", contact_Create);
contact.put("/contact/:id", contact_Update);
contact.delete("/contact", contact_Delete);

export default contact;
