import { Router } from "express";
import { getTasksByUserId, createTask, updateTaskCompletion, deleteTask, deleteCompletedTasks, getUserIdByTask } from "../db/queries.js";
import { validateTaskDescription } from "../utils/validation.js";

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

tasksRouter.post("/", async(req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validation = validateTaskDescription(req.body.description);

    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const newTask = await createTask(req.user.id, validation.value);

    return res.status(200).json({ newTask });
  } catch (error) {
    return next(error);
  }
});

tasksRouter.patch("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const taskOwnerId = await getUserIdByTask(req.params.id);

    if (!taskOwnerId || req.user.id !== taskOwnerId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updatedTask = await updateTaskCompletion(req.params.id, req.body.isCompleted);

    return res.status(200).json({ updatedTask });
  } catch (error) {
    return next(error);
  }
});

tasksRouter.delete("/completed", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await deleteCompletedTasks(req.user.id);

    return res.status(200).end();
  } catch (error) {
    return next(error);
  }
});

tasksRouter.delete("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const taskOwnerId = await getUserIdByTask(req.params.id);

    if (!taskOwnerId || req.user.id !== taskOwnerId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await deleteTask(req.params.id);

    return res.status(200).end();
  } catch (error) {
    return next(error);
  }
});

export default tasksRouter;