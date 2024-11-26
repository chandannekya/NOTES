import mongoose, { Schema, Model, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  userId: string;
}

const noteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);

export default Note;
