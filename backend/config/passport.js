import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmail, getUserById } from "../db/queries.js";
import { comparePassword } from "../utils/passwords.js";

// Configure local email/password authentication and return a minimal session-safe user object.
passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  // Verify login credentials and pass auth result to Passport via done.
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "Invalid email." });
      }

      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return done(null, false, { message: "Invalid password." });
      }

      return done(null, {
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      return done(error);
    }
  }
));

// Store only the user id in the session payload.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Rehydrate req.user from the session id using a safe user shape.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, {
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    return done(error);
  }
});