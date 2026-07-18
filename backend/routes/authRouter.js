import { Router } from "express";
import passport from "passport";
import { createUser, getUserByEmail } from "../db/queries.js";
import { hashPassword } from "../utils/passwords.js";

const authRouter = Router();

function toSafeUser(user) {
	return {
		id: user.id,
		email: user.email,
	};
}

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

authRouter.post("/signup", async (req, res, next) => {
	try {
		const { email, password, confirmPassword, rememberMe } = req.body;

		if (!email || !password || !confirmPassword) {
			return res.status(400).json({ error: "Email and passwords are required." });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords do not match." });
		}

		if (password.length < 8) {
			return res.status(400).json({ error: "Password must be at least 8 characters." });
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(409).json({ error: "Email is already in use." });
		}

		const hashedPassword = await hashPassword(password);
		const user = await createUser(email, hashedPassword);

		await loginUser(req, user);

		if (rememberMe) {
			req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
		}

		return res.status(201).json({ user: toSafeUser(user) });
	} catch (error) {
		if (error?.code === "23505") {
			return res.status(409).json({ error: "Email is already in use." });
		}

		return next(error);
	}
});

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

			if (req.body?.rememberMe) {
				req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
			}

			return res.status(200).json({ user: toSafeUser(user) });
		} catch (loginError) {
			return next(loginError);
		}
	})(req, res, next);
});

authRouter.post("/logout", async (req, res, next) => {
	try {
		await logoutUser(req);
		req.session.destroy((error) => {
			if (error) {
				return next(error);
			}

			return res.status(204).send();
		});
	} catch (error) {
		next(error);
	}
});

authRouter.get("/me", (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	return res.status(200).json({ user: toSafeUser(req.user) });
});

export default authRouter;