import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { borrowBook, getMyBooks, returnBook, getReminder } from "../controllers/borrowController.js";

const router= express.Router();

router.post('/',authMiddleware, borrowBook);
router.get('/my-books',authMiddleware, getMyBooks);
router.put('/return/:id', authMiddleware, returnBook);
router.get('/reminder', authMiddleware, getReminder);

export default router;