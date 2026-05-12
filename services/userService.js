import { db } from "../config/db.js";

// REGISTER
export const createUser = (data) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(
      sql,
      [data.name, data.email, data.password],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// LOGIN
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};