import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { db } from "../config/db.js";
import { sendVerificationEmail } from "./emailService.js";

// ======================
// GET ALL USERS
// ======================
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ======================
// GET USER BY ID
// ======================
export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ======================
// CREATE USER (REGISTER)
// ======================
export const createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(
        data.password,
        10
      );

      const verificationToken = uuidv4();

      const sql = `
        INSERT INTO users
        (
          name,
          username,
          email,
          password,
          verification_token
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          data.name,
          data.username,
          data.email,
          hashedPassword,
          verificationToken,
        ],
        async (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          console.log(
            "Verification Token:",
            verificationToken
          );

          // KIRIM EMAIL VERIFIKASI
          await sendVerificationEmail(
            data.email,
            verificationToken
          );

          resolve(result);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

// ======================
// UPDATE USER
// ======================
export const updateUser = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = "";
      let values = [];

      if (data.password) {
        const hashedPassword = await bcrypt.hash(
          data.password,
          10
        );

        sql = `
          UPDATE users
          SET
            name = ?,
            username = ?,
            email = ?,
            password = ?
          WHERE id = ?
        `;

        values = [
          data.name,
          data.username,
          data.email,
          hashedPassword,
          id,
        ];
      } else {
        sql = `
          UPDATE users
          SET
            name = ?,
            username = ?,
            email = ?
          WHERE id = ?
        `;

        values = [
          data.name,
          data.username,
          data.email,
          id,
        ];
      }

      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

// ======================
// DELETE USER
// ======================
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ======================
// LOGIN USER
// ======================
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (result.length === 0) {
        resolve({
          success: false,
          message: "Email atau password salah",
        });
        return;
      }

      const user = result[0];

      // EMAIL BELUM DIVERIFIKASI
      if (!user.is_verified) {
        resolve({
          success: false,
          message: "Email belum diverifikasi",
        });
        return;
      }

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        resolve({
          success: false,
          message: "Email atau password salah",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const userData = { ...user };
      delete userData.password;

      resolve({
        success: true,
        message: "Login success",
        token,
        user: userData,
      });
    });
  });
};

// ======================
// VERIFY EMAIL
// ======================
export const verifyEmail = (token) => {
  return new Promise((resolve, reject) => {
    const findUserSql = `
      SELECT * FROM users
      WHERE verification_token = ?
    `;

    db.query(
      findUserSql,
      [token],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        if (result.length === 0) {
          resolve({
            success: false,
            message: "Invalid Verification Token",
          });
          return;
        }

        const updateSql = `
          UPDATE users
          SET
            is_verified = 1,
            verification_token = NULL
          WHERE verification_token = ?
        `;

        db.query(
          updateSql,
          [token],
          (err) => {
            if (err) {
              reject(err);
              return;
            }

            resolve({
              success: true,
              message:
                "Email Verified Successfully",
            });
          }
        );
      }
    );
  });
};