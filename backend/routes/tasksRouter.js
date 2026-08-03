import { Router } from "express";
import { getTasksByUserId, createTask, updateTaskCompletion, deleteTask, deleteCompletedTasks, getUserIdByTask } from "../db/queries.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateTaskDescription } from "../utils/validation.js";

const tasksRouter = Router();

// Ensure only authenticated users can access task routes.
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

// Fetch all tasks belonging to the currently signed-in user.
tasksRouter.get("/", requireAuth, asyncHandler(async (req, res) => {
  const tasks = await getTasksByUserId(req.user.id);

  return res.status(200).json({ tasks });
}));

// Create a new task for the authenticated user.
tasksRouter.post("/", requireAuth, asyncHandler(async (req, res) => {
  const validation = validateTaskDescription(req.body.description);

  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const newTask = await createTask(req.user.id, validation.value);

  return res.status(200).json({ newTask });
}));

// Update a task's completion state for the authenticated user.
tasksRouter.patch("/:id", requireAuth, asyncHandler(async (req, res) => {
  const taskOwnerId = await getUserIdByTask(req.params.id);

  if (!taskOwnerId || req.user.id !== taskOwnerId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updatedTask = await updateTaskCompletion(req.params.id, req.body.isCompleted);

  return res.status(200).json({ updatedTask });
}));

// Delete completed tasks for the authenticated user.
tasksRouter.delete("/completed", requireAuth, asyncHandler(async (req, res) => {
  await deleteCompletedTasks(req.user.id);

  return res.status(200).end();
}));

// Delete a task for the authenticated user.
tasksRouter.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
  const taskOwnerId = await getUserIdByTask(req.params.id);

  if (!taskOwnerId || req.user.id !== taskOwnerId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await deleteTask(req.params.id);

  return res.status(200).end();
}));

export default tasksRouter;