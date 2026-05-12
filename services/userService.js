import { db } from "../config/db.js";

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


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

export const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";

    db.query(
      sql,
      [data.name, data.email, data.password, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

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