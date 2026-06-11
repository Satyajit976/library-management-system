import express from "express";
import { loginStudent, registerStudent } from "../controllers/studentController.js";

const router = express.Router();

router.post("/signup", registerStudent);
router.post('/login', loginStudent);

export default router;