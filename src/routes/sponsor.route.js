import express from "express";
import {
  sponsor_Create,
} from "../controller/sponsor.controllers.js";

const sponsor = express.Router();

sponsor.post("/sponsor", sponsor_Create);

export default sponsor;