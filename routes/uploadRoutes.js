import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// UPLOAD SINGLE FILE
router.post(
  "/",
  upload.single("image"),
  (req, res) => {
    res.status(200).json({
      message: "Upload success",
      file: req.file,
    });
  }
);

export default router;