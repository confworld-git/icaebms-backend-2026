/**
 * Security Middleware
 * Lightweight custom security headers + in-memory IP rate limiter.
 * No third-party packages required.
 */

// ─── Security Headers ─────────────────────────────────────────────────────────
export const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Block the page from being loaded in iframes (clickjacking protection)
  res.setHeader("X-Frame-Options", "DENY");
  // Enable browser's XSS filter
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Prevent browser from leaking referrer info
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // Enforce strict content security policy
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  next();
};

// ─── In-Memory Rate Limiter ───────────────────────────────────────────────────
const ipStore = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 200;          // max 200 requests per window per IP

// Cleanup expired entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipStore.entries()) {
    if (now - entry.startTime > WINDOW_MS) {
      ipStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();

  if (!ipStore.has(ip)) {
    ipStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  const entry = ipStore.get(ip);

  // Reset window if it has expired
  if (now - entry.startTime > WINDOW_MS) {
    ipStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  }

  next();
};

// ─── Stricter Rate Limiter for Sensitive Routes ─────────────────────────────
// Use this on /login, /registration, /payment endpoints
const sensitiveIpStore = new Map();
const SENSITIVE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const SENSITIVE_MAX_REQUESTS = 20;           // max 20 requests per window per IP

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of sensitiveIpStore.entries()) {
    if (now - entry.startTime > SENSITIVE_WINDOW_MS) {
      sensitiveIpStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export const sensitiveRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();

  if (!sensitiveIpStore.has(ip)) {
    sensitiveIpStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  const entry = sensitiveIpStore.get(ip);

  if (now - entry.startTime > SENSITIVE_WINDOW_MS) {
    sensitiveIpStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  entry.count++;

  if (entry.count > SENSITIVE_MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests to this endpoint. Please try again in 15 minutes.",
    });
  }

  next();
};
