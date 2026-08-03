import { Router } from "express";
import passport from "passport";
import { createUser, getUserByEmail } from "../db/queries.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hashPassword } from "../utils/passwords.js";
import { validateSignupInput } from "../utils/validation.js";

const authRouter = Router();

// Return only non-sensitive user fields for API responses.
function toSafeUser(user) {
	return {
		id: user.id,
		email: user.email,
	};
}

// Logs user in and triggers serializeUser, which stores user.id in the session.
function loginUser(req, user) {
	return new Promise((resolve, reject) => {
		req.logIn(user, (error) => {
			if (error) {
				reject(error);
				return;
			}

			resolve();
		});
	});
}

function logoutUser(req) {
	return new Promise((resolve, reject) => {
		req.logout((error) => {
			if (error) {
				reject(error);
				return;
			}

			resolve();
		});
	});
}

// Validate signup input, enforce unique email, create user, and log them in.
authRouter.post("/signup", asyncHandler(async (req, res) => {
	const { email, password, confirmPassword, rememberMe } = req.body;
	const validation = validateSignupInput({ email, password, confirmPassword });

	if (validation.error) {
		return res.status(400).json({ error: validation.error });
	}

	const existingUser = await getUserByEmail(email);
	
	if (existingUser) {
		return res.status(409).json({ error: "Email is already in use." });
	}

	const hashedPassword = await hashPassword(password);
	const user = await createUser(email, hashedPassword);

	await loginUser(req, user);

	// Extend cookie lifetime when "remember me" is enabled (30 days).
	if (rememberMe) {
		req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
	}

	return res.status(201).json({ user: toSafeUser(user) });
}));

// Validate credentials with Passport's local strategy callback, then establish a session.
authRouter.post("/login", (req, res, next) => {
	passport.authenticate("local", async (error, user, info) => {
		if (error) {
			return next(error);
		}

		if (!user) {
			return res.status(401).json({ error: info?.message || "Invalid credentials." });
		}

		try {
			await loginUser(req, user);

			// Extend cookie lifetime when "remember me" is enabled (30 days).
			if (req.body?.rememberMe) {
				req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
			}

			return res.status(200).json({ user: toSafeUser(user) });
		} catch (loginError) {
			return next(loginError);
		}
	})(req, res, next);
});

// Log out the current user and destroy their server-side session.
authRouter.post("/logout", asyncHandler(async (req, res, next) => {
	await logoutUser(req);
	
	req.session.destroy((error) => {
		if (error) {
			return next(error);
		}

		return res.status(204).send();
	});
}));

// Return the current user restored by deserializeUser from session id.
authRouter.get("/me", (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	return res.status(200).json({ user: toSafeUser(req.user) });
});

export default authRouter;