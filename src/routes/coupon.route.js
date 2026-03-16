import express from "express";
import {
  validate_Coupon,
  coupon_GetAll,
  coupon_Create,
  coupon_Update,
  coupon_Delete,
} from "../controller/coupon.controller.js";

const coupon = express.Router();

coupon.post("/coupon/validate", validate_Coupon);
coupon.get("/coupon",           coupon_GetAll);
coupon.post("/coupon",          coupon_Create);
coupon.put("/coupon/:id",       coupon_Update);
coupon.delete("/coupon/:id",    coupon_Delete);

export default coupon;