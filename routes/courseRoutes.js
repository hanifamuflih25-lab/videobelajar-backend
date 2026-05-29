import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService.js";

// IMPORT MIDDLEWARE
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================
// GET ALL COURSES
// SEARCH / FILTER / SORT
// PROTECTED ROUTE
// ======================
router.get("/", verifyToken, async (req, res) => {
  try {
    // AMBIL QUERY PARAMS
    const query = req.query;

    // KIRIM QUERY KE SERVICE
    const data = await getAllCourses(query);

    res.status(200).json({
      message: "Success get all courses",
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// GET COURSE BY ID
// PROTECTED ROUTE
// ======================
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const data = await getCourseById(req.params.id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Success get course",
      data: data[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// CREATE COURSE
// PROTECTED ROUTE
// ======================
router.post("/", verifyToken, async (req, res) => {
  try {
    const result = await createCourse(req.body);

    res.status(201).json({
      message: "Course created",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// UPDATE COURSE
// PROTECTED ROUTE
// ======================
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const result = await updateCourse(
      req.params.id,
      req.body
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// DELETE COURSE
// PROTECTED ROUTE
// ======================
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const result = await deleteCourse(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;