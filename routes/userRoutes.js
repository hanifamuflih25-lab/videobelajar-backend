import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  verifyEmail,
} from "../services/userService.js";

const router = express.Router();

// ======================
// GET ALL USERS
// ======================
router.get("/", async (req, res) => {
  try {
    const data = await getAllUsers();

    res.status(200).json({
      message: "Success get all users",
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// VERIFY EMAIL
// ======================
router.get("/verify-email", async (req, res) => {
  try {
    const result = await verifyEmail(
      req.query.token
    );

    if (!result.success) {
      return res.status(400).json({
        message: result.message,
      });
    }

    res.status(200).json({
      message: result.message,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// GET USER BY ID
// ======================
router.get("/:id", async (req, res) => {
  try {
    const data = await getUserById(req.params.id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Success get user",
      data: data[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// CREATE USER
// ======================
router.post("/", async (req, res) => {
  try {
    const result = await createUser(req.body);

    res.status(201).json({
      message: "User created",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// REGISTER USER
// ======================
router.post("/register", async (req, res) => {
  try {
    const result = await createUser(req.body);

    res.status(201).json({
      message: "User registered. Check your email.",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// LOGIN USER
// ======================
router.post("/login", async (req, res) => {
  try {
    const result = await loginUser(
      req.body.email,
      req.body.password
    );

    if (!result.success) {
      return res.status(401).json({
        message: result.message,
      });
    }

    res.status(200).json({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// UPDATE USER
// ======================
router.patch("/:id", async (req, res) => {
  try {
    const result = await updateUser(
      req.params.id,
      req.body
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// DELETE USER
// ======================
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

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