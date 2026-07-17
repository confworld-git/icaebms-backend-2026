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
import { securityHeaders, rateLimiter } from "./middleware/security.js";
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
  "http://localhost:3000",
  "http://localhost:30005",
  "https://backend.wcmrp.com",
  "http://backend.wcmrp.com",
  "https://wcmrp.com",
  "http://wcmrp.com",
  "https://www.wcmrp.com",
  "http://www.wcmrp.com",
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

// --- DB & core middleware ---
connectDB();

// Security: custom headers + global rate limiter (must be before routes)
server.use(securityHeaders);
server.use(rateLimiter);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// Request logger
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
