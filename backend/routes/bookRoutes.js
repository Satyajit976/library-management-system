import express from "express";
import { addBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

router.get('/',getAllBooks);
router.get('/:id',getBookById);
router.post('/',authMiddleware, addBook);
router.put('/:id',authMiddleware, updateBook);
router.delete('/:id',authMiddleware, deleteBook);

export default router;