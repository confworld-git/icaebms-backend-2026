import express from "express";
import { getImage } from "../controller/image.controllers.js";

const Image = express.Router();
Image.get("/image/:id", getImage);

export default Image;
