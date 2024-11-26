import { Request, Response } from "express";
import Note from "../models/notes.model";
import User from "../models/user.model";
import mongoose from "mongoose";
import { error } from "console";

export const createNote: any = async (req: Request, res: Response) => {
  console.log("user id", req.user.userId);
  try {
    const { title, content } = req.body;

    // const userId = req.userId;
    const userId = req.user.userId;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const note = await Note.create({ title, content, userId });

    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { notes: note._id } },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Note created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotes: any = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const notes = await Note.find({ userId });

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote: any = async (req: Request, res: Response) => {
  try {
    const noteId = req.body._id as string;
    const userId = req.user.userId;

    if (!noteId || !mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid or missing note ID" });
    }

    const note = await Note.findById(noteId).populate("userId");
    console.log(note);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(noteId);

    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { notes: noteId } },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOneNote: any = async (req: Request, res: Response) => {
  try {
    const NoteId = req.query.id as string; // Make sure it's a string
    if (!NoteId || !mongoose.Types.ObjectId.isValid(NoteId)) {
      return res.status(400).json({ message: "Invalid or missing note ID" });
    }

    const note = await Note.findById(NoteId);

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
