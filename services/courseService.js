import { db } from "../config/db.js";

// ======================
// GET ALL COURSES
// SEARCH / FILTER / SORT
// ======================
export const getAllCourses = (query) => {
  return new Promise((resolve, reject) => {

    // SQL DASAR
    let sql = "SELECT * FROM courses";

    // ======================
    // SEARCH
    // ======================
    if (query.search) {
      sql += ` WHERE title LIKE '%${query.search}%'`;
    }

    // ======================
    // FILTER
    // ======================
    if (query.teacher) {

      // CEK apakah sudah ada WHERE
      if (sql.includes("WHERE")) {
        sql += ` AND teacher = '${query.teacher}'`;
      } else {
        sql += ` WHERE teacher = '${query.teacher}'`;
      }
    }

    // ======================
    // SORT
    // ======================
    if (query.sort) {
      sql += ` ORDER BY ${query.sort} ASC`;
    }

    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// ======================
// GET COURSE BY ID
// ======================
export const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM courses WHERE id = ?",
      [id],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

// ======================
// CREATE COURSE
// ======================
export const createCourse = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO courses SET ?",
      data,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// ======================
// UPDATE COURSE
// ======================
export const updateCourse = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE courses SET ? WHERE id = ?",
      [data, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// ======================
// DELETE COURSE
// ======================
export const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM courses WHERE id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};