import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { config as configDotenv } from "dotenv";

configDotenv();

// Extend the Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust `any` to the actual type of your decoded token payload
    }
  }
}

export const auth: any = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token || req.body?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      // Verify the token
      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultSecret"
      );
      console.log("Decoded token:", decode);
      req.user = decode; // Attach decoded token to the `req.user`
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Auth middleware error:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
