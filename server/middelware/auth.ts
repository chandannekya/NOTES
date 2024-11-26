import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config as configDotenv } from "dotenv";
import cookieParser from "cookie-parser"; // Ensure cookie-parser is imported and used in your app

configDotenv();

// Extend the Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace `any` with the specific type of your decoded token payload
    }
  }
}

// Auth middleware function
export const auth: any = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Retrieve token from cookies, request body, or authorization header
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Log the token sources for debugging
    console.log("Token from cookies:", req.cookies?.token);
    console.log("Token from body:", req.body?.token);
    console.log(
      "Token from Authorization header:",
      req.header("Authorization")
    );

    // If no token is found, respond with an error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not found",
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    );

    // Log the decoded token for debugging
    console.log("Decoded token:", decoded);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Log detailed error for debugging
    console.error("Authentication middleware error:", error);

    // Determine the error type and respond appropriately
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
