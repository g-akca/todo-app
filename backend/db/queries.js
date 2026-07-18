import pool from "./pool.js";

async function getUserByEmail(email) {
  try {
    return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw(error);
  }
}

async function getUserById(id) {
  try {
    return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw(error);
  }
}

export { getUserByEmail, getUserById };