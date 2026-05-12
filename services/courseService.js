import { db } from "../config/db.js";


export const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM courses", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


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


export const createCourse = (data) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO courses SET ?", data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


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