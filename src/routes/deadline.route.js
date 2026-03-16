import express from "express";
import {
  deadline_GetAll,
  deadline_GetById,
  deadline_Create,
  deadline_Update,
  deadline_Delete,
} from "../controller/deadline.controllers.js";

const deadline = express.Router();

deadline.get("/deadline", deadline_GetAll);
deadline.get("/deadline/:id", deadline_GetById);
deadline.post("/deadline", deadline_Create);
deadline.put("/deadline/:id", deadline_Update);
deadline.delete("/deadline/:id", deadline_Delete);

export default deadline;
