import pool from "./pool.js";

async function getUserByEmail(email) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] ?? null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw(error);
  }
}

async function getUserById(id) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] ?? null;
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw(error);
  }
}

async function createUser(email, password) {
  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw(error);
  }
}

async function getTasksByUserId(userId) {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
    return result.rows ?? null;
  } catch (error) {
    console.error("Error finding tasks by user id:", error);
    throw(error);
  }
}

async function getUserIdByTask(taskId) {
  try {
    const result = await pool.query("SELECT user_id FROM tasks WHERE id = $1", [taskId]);
    return result.rows[0]?.user_id ?? null;
  } catch (error) {
    console.error("Error getting user ID by task:", error);
    throw(error);
  }
}

async function createTask(userId, description) {
  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, description) VALUES ($1, $2) RETURNING id, user_id, description, is_completed", 
      [userId, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating task:", error);
    throw(error);
  }
}

async function updateTaskCompletion(id, isCompleted) {
  try {
    const result = await pool.query(
      "UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING id, user_id, description, is_completed",
      [isCompleted, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating task completion state:", error);
    throw(error);
  }
}

async function deleteTask(id) {
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw(error);
  }
}

async function deleteCompletedTasks(userId) {
  try {
    await pool.query("DELETE FROM tasks WHERE user_id = $1 AND is_completed = TRUE", [userId]);
  } catch (error) {
    console.error("Error deleting completed tasks:", error);
    throw(error);
  }
}

export { getUserByEmail, getUserById, createUser, getTasksByUserId, getUserIdByTask, createTask, updateTaskCompletion, deleteTask, deleteCompletedTasks };