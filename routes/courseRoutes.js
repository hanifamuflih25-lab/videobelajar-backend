import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const data = await getAllCourses();

    res.status(200).json({
      message: "Success get all courses",
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const result = await createCourse(req.body);

    res.status(201).json({
      message: "Course created",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const result = await updateCourse(req.params.id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
});

export default router;