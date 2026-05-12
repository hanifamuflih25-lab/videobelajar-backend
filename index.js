import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/courses", courseRoutes);
app.use("/users", userRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});