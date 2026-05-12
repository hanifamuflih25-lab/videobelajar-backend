import express from "express";
import { createUser, loginUser } from "../services/userService.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    await createUser(req.body);

    res.status(201).json({
      message: "User registered",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const data = await loginUser(
      req.body.email,
      req.body.password
    );

    if (data.length === 0) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    res.status(200).json({
      message: "Login berhasil",
      user: data[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;