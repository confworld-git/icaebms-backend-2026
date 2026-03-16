// index.js
import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config.js";

import registration from "./routes/registration.route.js";
import payment from "./routes/payment.route.js";
import download from "./routes/download.route.js";
import committee_member from "./routes/committee_member.route.js";
import paper_submission from "./routes/paper_submission.route.js";
import contact from "./routes/contact.route.js";
import enquiry from "./routes/enquiry.route.js";
import connectDB from "./config/db.js";
import { middlelog } from "./middleware/middleware.js";
import admin from "./routes/admin.route.js";
import speaker from "./routes/speaker.route.js";
import sponsor from "./routes/sponsor.route.js";
import deadline from "./routes/deadline.route.js";
import image from "./routes/image.route.js";
import coupon from "./routes/coupon.route.js";

import cors from "cors";

const server = express();

// --- CORS whitelist (exact origins only) ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:30026",
  "https://backend.icaebms.com",
  "http://backend.icaebms.com",
  "https://icaebms.com",
  "http://icaebms.com",
];

server.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin); // Debug log
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Add explicit OPTIONS handler for preflight requests
server.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true);
  res.sendStatus(200);
});

// --- cors() with dynamic origin reflection + optionsSuccessStatus=200 ---
// const corsOptionsDelegate = (req, callback) => {
//   const origin = req.header("Origin");
//   const isAllowed = !origin || CORS_WHITELIST.includes(origin);
//   callback(null, {
//     origin: isAllowed ? origin : false,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//     optionsSuccessStatus: 200, // avoid 204 quirks through proxies
//   });
// };

// server.use(cors(corsOptionsDelegate));
// server.options("*", cors(corsOptionsDelegate)); // explicit preflight handler

// --- DB & core middleware ---
connectDB();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// Your request logger / custom middleware
server.use(middlelog);

// --- Routes (order matters only if some share paths) ---
server.use(admin);
server.use(speaker);
server.use(sponsor);
server.use(deadline);
server.use(contact);
server.use(download);
server.use(registration);
server.use(paper_submission);
server.use(payment);
server.use(enquiry);
server.use(committee_member);
server.use(image);
server.use(coupon);

// Health check
server.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Basic error handler (helps see CORS/route issues in logs)
server.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// --- Start server ---
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
