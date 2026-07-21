import { Router } from "express";
import { getTasksByUserId } from "../db/queries.js";

const tasksRouter = Router();

tasksRouter.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const tasks = await getTasksByUserId(req.user.id);

    return res.status(200).json({ tasks });
  } catch (error) {
    return next(error);
  }
});

export default tasksRouter;