import express from "express";
import { createNote, getNotes, deleteNote } from "../controller/notes";
import { auth } from "../middelware/auth";

const router = express.Router();

router.post("/createNote", auth, createNote);
router.get("/getNotes", auth, getNotes);
router.delete("/deleteNote", auth, deleteNote);

export default router;
