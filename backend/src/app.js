import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`)
);
