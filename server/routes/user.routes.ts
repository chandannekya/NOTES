import express from "express";
const router = express.Router();

import { SignUp, signIn } from "../controller/user";
import { otpSend } from "../controller/sendotp";

router.post("/signUp", SignUp);
router.post("/signIn", signIn);
router.post("/otpSend", otpSend);

export default router;
