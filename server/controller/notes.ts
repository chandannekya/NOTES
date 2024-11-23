import { Request, Response } from "express";
import Note from "../models/notes.model";
import User from "../models/user.model";

export const createNote: any = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const note = await Note.create({ title, content, userId });

    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { notes: note._id } },
      { new: true }
    );

    return res.status(200).json({ message: "Note created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotes: any = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const notes = await Note.find({ userId });

    return res.status(200).json({ notes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote: any = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.body;
    const userId = req.user._id;

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(noteId);

    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { notes: noteId } },
      { new: true }
    );

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
