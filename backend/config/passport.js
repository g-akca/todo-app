import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmail, getUserById } from "../db/queries.js";

passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "Invalid email." });
      }

      // Compare passwords later
      const isValidPassword;

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

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