import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import authRouter from "./routes/authRouter.js";
import "./config/passport.js";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "cats",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

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