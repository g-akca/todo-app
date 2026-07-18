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

export { getUserByEmail, getUserById, createUser };