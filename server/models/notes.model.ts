import exp from "constants";
import mongoose, { Schema, Model, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);

export default Note;
