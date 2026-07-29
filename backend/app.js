import "dotenv/config";
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";

import authRouter from "./routes/authRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import "./config/passport.js";

const app = express();
const PORT = 3000;
const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow same-origin and non-browser requests without an Origin header.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(session({
  secret: process.env.SESSION_SECRET || "cats",
  resave: false,
  saveUninitialized: false,
  proxy: isProduction,
  cookie: {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, (e) => {
  if (e) {
    throw e;
  }

  console.log(`Listening on port ${PORT}!`)
});