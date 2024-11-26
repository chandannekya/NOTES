import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOtpSend = async () => {
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    setIsOtpSent(true);
    try {
      const response = await axios.post(`${apiUrl}/api/Auth/otpSend`, {
        email: formData.email,
      });

      if (response.data.success) {
        toast.success("OTP sent successfully to your email");
        setIsOtpSent(false);
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "API Error: Unable to send OTP"
        );
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (formData.otp.trim() === "") {
      toast.error("OTP is required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/Auth/signIn`, {
        email: formData.email,
        otp: formData.otp,
      });

      if (response.data.success) {
        toast.success("Sign-in successful");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        console.log(response.data.user);
        navigate("/", { state: { user: response.data.user } });
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "API Error: Unable to verify OTP"
        );
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:flex flex-row-reverse gap-8 justify-center items-center m-2">
      <div className="hidden xl:block xl:w-3/4 h-[95vh] p-x-6 m-x-4">
        <img
          className="w-full h-full rounded-md object-cover border-2 border-slate-200"
          src="https://img.freepik.com/free-photo/top-view-stationery-composition-bicolor-background_23-2148513324.jpg"
        />
      </div>
      <div className="xl:w-[30%] m-8">
        <div className="flex justify-center items-center flex-col gap-5">
          <svg
            width="79"
            height="32"
            viewBox="0 0 79 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z"
              fill="#367AFF"
            />
            <path
              d="M22.3777 17.7771C22.107 18.9176 21.5356 19.9421 20.7515 20.763L27.1034 27.0935L29.4147 24.7901L22.3777 17.7771Z"
              fill="#367AFF"
            />
            <path
              d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z"
              fill="#367AFF"
            />
            <path
              d="M17.6481 22.5819C17.1263 22.7156 16.5794 22.7866 16.0158 22.7866C15.412 22.7866 14.8273 22.705 14.2722 22.5523L11.9587 31.1569L15.1159 32L17.6481 22.5819Z"
              fill="#367AFF"
            />
            <path
              d="M14.1608 22.5205C13.0533 22.1945 12.0683 21.584 11.291 20.7739L4.92334 27.1199L7.23454 29.4233L14.1608 22.5205Z"
              fill="#367AFF"
            />
            <path
              d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z"
              fill="#367AFF"
            />
            <path
              d="M46.0766 25V7.54544H49.2385V14.9346H57.3266V7.54544H60.497V25H57.3266V17.5852H49.2385V25H46.0766ZM68.8907 25H62.976V7.54544H69.0101C70.743 7.54544 72.2316 7.89487 73.476 8.59373C74.726 9.28692 75.6862 10.2841 76.3566 11.5852C77.0271 12.8863 77.3623 14.4432 77.3623 16.2557C77.3623 18.0738 77.0243 19.6363 76.3481 20.9432C75.6777 22.25 74.7089 23.2528 73.4419 23.9517C72.1805 24.6506 70.6635 25 68.8907 25ZM66.1379 22.2642H68.7373C69.9532 22.2642 70.9674 22.0426 71.7799 21.5994C72.5924 21.1506 73.2032 20.4829 73.6123 19.5966C74.0214 18.7045 74.226 17.5909 74.226 16.2557C74.226 14.9204 74.0214 13.8125 73.6123 12.9318C73.2032 12.0454 72.5981 11.3835 71.797 10.946C71.0015 10.5028 70.0129 10.2812 68.8311 10.2812H66.1379V22.2642Z"
              fill="#232323"
            />
          </svg>
          <h2 className="text-3xl font-bold mb-8">Sign In</h2>
        </div>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div>
            <label
              className="relative top-3 bg-white ml-3 px-2"
              htmlFor="email"
            >
              Email
            </label>
            <br />
            <input
              className="border-[1px] w-full p-2 bg-white rounded-md focus:bg-none border-black"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email"
            />
          </div>
          <div>
            <label className="relative top-3 bg-white ml-3 px-2" htmlFor="otp">
              OTP
            </label>
            <br />
            <input
              className="border-[1px] w-full p-2 bg-white rounded-md focus:bg-none border-black"
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              aria-label="OTP"
              maxLength={6}
            />
          </div>
          <button
            type="button"
            onClick={handleOtpSend}
            disabled={loading || !formData.email}
            className="bg-blue-500 p-2 font-semibold text-white rounded-md"
          >
            {isOtpSent ? "Sending OTP..." : "Send OTP"}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 p-2 font-semibold text-white rounded-md"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
