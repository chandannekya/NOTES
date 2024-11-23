import mongoose, { Model, Schema, Document } from "mongoose";

export interface IOtp extends Document {
  otp: string;
  email: string;
}

const otpSchema: Schema = new Schema({
  otp: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 },
});

const Otp: Model<IOtp> = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
