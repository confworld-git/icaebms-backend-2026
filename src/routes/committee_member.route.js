import express from "express";
import { authorization } from "../middleware/middleware.js";
import {
  CommitteeMember_GetAll,
  CommitteeMember_Create,
  CommitteeMember_Delete,
} from "../controller/committee_member.controllers.js";
import { multer_file } from "../middleware/middleware.js";

const committeeMember = express.Router();

committeeMember.get("/committeeMember", authorization, CommitteeMember_GetAll);
committeeMember.post(
  "/committeeMember",
  multer_file.single("file"),
  CommitteeMember_Create
);
committeeMember.delete("/committeeMember", CommitteeMember_Delete);

export default committeeMember;
