import express from "express";
import { multer_file, authorization } from "../middleware/middleware.js";
import {
  paper_submission_GetAll,
  paper_submission_GetById,
  paper_submission_Create,
} from "../controller/paper_submission.controllers.js";

const paper_submission = express.Router();

paper_submission.get(
  "/paperSubmission",
  authorization,
  paper_submission_GetAll
);
paper_submission.get("/paperSubmission/:id", paper_submission_GetById);
paper_submission.post(
  "/paperSubmission",
  multer_file.single("file"),
  paper_submission_Create
);

export default paper_submission;
