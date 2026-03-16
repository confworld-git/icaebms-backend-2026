import express from "express";
import {
  payment_validate,
  payment_cancel,
} from "../controller/payment.controllers.js";

const payment = express.Router();

payment.post("/payment/validate", payment_validate);
payment.post("/payment/cancel", payment_cancel);

export default payment;
