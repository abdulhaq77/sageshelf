import express from "express";
import { getSearchSuggestions } from "../controllers/search.controller.js";

const router = express.Router();

// search suggestions
router.post("/suggestions", getSearchSuggestions);

export default router;
