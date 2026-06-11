import express from "express";
import { adminLogin, getAllStudents, getBorrowRecords, getDashboardStats, getPublicStats } from "../controllers/adminControllers.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router= express.Router();

router.post('/login', adminLogin);
router.get('/stats',getPublicStats);
router.get('/students', adminAuthMiddleware, getAllStudents);
router.get('/borrow-records', adminAuthMiddleware, getBorrowRecords);
router.get('/dashboard', adminAuthMiddleware, getDashboardStats);

export default router;