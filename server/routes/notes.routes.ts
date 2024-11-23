import express from "express";
import { createNote, getNotes } from "../controller/notes";
import { auth } from "../middelware/auth";

const router = express.Router();

router.post("/createNote",auth ,createNote);
router.get("/getNotes",auth, getNotes);

export default router;


