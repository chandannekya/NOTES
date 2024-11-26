import User from "../models/user.model";
import otpGenerator from "otp-generator";
import Otp from "../models/otp";
import { Request, Response } from "express";
import { mailer } from "../utils/mialsender";
export const otpSend: any = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    

    const OTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let userOtp = await Otp.findOne({ email: email });

    while (userOtp) {
      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      userOtp = await Otp.findOne({ email: email });
    }

    await Otp.create({ email, otp: OTP });

    await mailer(email, "OTP for registration", "Your OTP is " + OTP);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
