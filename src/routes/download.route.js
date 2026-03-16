import express from "express";
import { authorization } from "../middleware/middleware.js";
import {
  download_GetAll,
  download_Create,
} from "../controller/download.controllers.js";

const download = express.Router();

download.get("/download", authorization, download_GetAll);
download.post("/download", download_Create);

export default download;
