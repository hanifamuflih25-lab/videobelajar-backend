import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// ======================
// DATABASE CONNECTION
// ======================
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ======================
// CONNECT
// ======================
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected!");
  }
});