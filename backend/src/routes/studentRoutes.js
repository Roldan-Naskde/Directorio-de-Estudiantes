import express from "express";
import { studentController } from "../controllers/studentController.js";

const router = express.Router();

router.get("/", studentController.getAll);
router.post("/", studentController.create);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);

export default router;
