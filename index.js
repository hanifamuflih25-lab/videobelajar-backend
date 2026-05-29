import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./config/db.js";

import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// STATIC FOLDER
app.use("/uploads", express.static("uploads"));

// ======================
// ROOT ENDPOINT
// ======================
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ======================
// ROUTES
// ======================
app.use("/courses", courseRoutes);

app.use("/users", userRoutes);

app.use("/upload", uploadRoutes);

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});