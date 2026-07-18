import { Client } from "pg";

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    description VARCHAR(255) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE
  );
`;

async function main() {
  const client = new Client(
    process.env.DATABASE_URL ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    } : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "todo_app",
    }
  );

  try {
    console.log("Connecting to the database...");
    await client.connect();
    console.log("Connected. Running initialization SQL...");
    await client.query(SQL);
    console.log("Database initialization completed.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();