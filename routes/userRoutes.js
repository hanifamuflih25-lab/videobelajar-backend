import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../services/userService.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const data = await getAllUsers();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const data = await getUserById(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    await createUser(req.body);

    res.status(201).json({
      message: "User created",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


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


router.patch("/:id", async (req, res) => {
  try {
    await updateUser(req.params.id, req.body);

    res.status(200).json({
      message: "User updated",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);

    res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;