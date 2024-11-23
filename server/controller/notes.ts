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
