import express from "express";
import { multer_file } from "../middleware/middleware.js";
import {
  speaker_GetAll,
  speaker_GetById,
  speaker_Create,
  speaker_Update,
  speaker_Delete,
} from "../controller/speaker.controllers.js";

const speaker = express.Router();

speaker.get("/speaker", speaker_GetAll);
speaker.get("/speaker/:id", speaker_GetById);
speaker.post("/speaker", multer_file.single("Image"), speaker_Create);
speaker.put("/speaker/:id", speaker_Update);
speaker.delete("/speaker/:id", speaker_Delete);

export default speaker;
