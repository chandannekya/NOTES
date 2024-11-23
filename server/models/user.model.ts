import mongoose, { Schema, Model, Document } from "mongoose";
import Note from "./notes.model";

// User interface
export interface IUser extends Document {
  name: String;
  email: String;
  otp: String;
  token: String;
  DOB: Date;
  Notes: String[];
  image: String;
}

// schema for the User model
const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: String },
  DOB: { type: Date, required: true },
  image: { type: String },
  Notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});

// Create the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
