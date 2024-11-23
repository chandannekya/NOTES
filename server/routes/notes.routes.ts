import express from "express";
import { createNote } from "../controller/notes";

const router = express.Router();

router.post("/createNote", createNote);
