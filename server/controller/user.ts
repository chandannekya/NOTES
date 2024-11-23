import Otp from "../models/otp";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response, RequestHandler } from "express";
import { config as configDotenv } from "dotenv";

configDotenv();

/**
 * Sign up a new user with OTP validation.
 */
export const SignUp: any = async (req: Request, res: Response) => {
  try {
    const { username, email, DOB, otp } = req.body;

    // Validate input fields
    if (!username || !email || !DOB || !otp) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All fields are required, including OTP",
        });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Retrieve the latest OTP for the email
    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp || recentOtp.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Create a new user
    const newUser = await User.create({
      name: username,
      email,
      DOB,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
        username
      )}`,
    });

    // Generate a JWT token
    const payload = { email: newUser.email, userId: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "defaultSecret", {
      expiresIn: "20h",
    });

    // Set the token as a cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    // Respond with success
    res.status(200).json({
      success: true,
      token,
      user: newUser,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Sign in an existing user with OTP validation.
 */
export const signIn: any = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Validate input fields
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Retrieve the latest OTP for the email
    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp || recentOtp.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Generate a JWT token
    const payload = { email: user.email, userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "defaultSecret", {
      expiresIn: "20h",
    });

    // Set the token as a cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    // Respond with success
    res.status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
