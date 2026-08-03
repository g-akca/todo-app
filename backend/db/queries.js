import pool from "./pool.js";

async function getUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] ?? null;
}

async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

async function createUser(email, password) {
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, password]
  );
  return result.rows[0];
}

async function getTasksByUserId(userId) {
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
  return result.rows ?? null;
}

async function getUserIdByTask(taskId) {
  const result = await pool.query("SELECT user_id FROM tasks WHERE id = $1", [taskId]);
  return result.rows[0]?.user_id ?? null;
}

async function createTask(userId, description) {
  const result = await pool.query(
    "INSERT INTO tasks (user_id, description) VALUES ($1, $2) RETURNING id, user_id, description, is_completed", 
    [userId, description]
  );
  return result.rows[0];
}

async function updateTaskCompletion(id, isCompleted) {
  const result = await pool.query(
    "UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING id, user_id, description, is_completed",
    [isCompleted, id]
  );
  return result.rows[0];
}

async function deleteTask(id) {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
}

async function deleteCompletedTasks(userId) {
  await pool.query("DELETE FROM tasks WHERE user_id = $1 AND is_completed = TRUE", [userId]);
}

export { getUserByEmail, getUserById, createUser, getTasksByUserId, getUserIdByTask, createTask, updateTaskCompletion, deleteTask, deleteCompletedTasks };