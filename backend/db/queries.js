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

export { getUserByEmail, getUserById, createUser, getTasksByUserId, createTask };