import express from "express";
import { fetchSearchedBooks } from "../controllers/book.controller.js";
import { getFeaturedBooks } from "../controllers/book.controller.js";

const router = express.Router();

// get searched books
router.get("/books", fetchSearchedBooks);

// get fetaured books for homepage
router.get("/books/featured", getFeaturedBooks);

export default router;
