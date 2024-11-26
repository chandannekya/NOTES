import React, { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Define interfaces
interface User {
  title: string;
  content: string;
  _id: string;
}

interface UserData {
  name: string;
  email: string;
  address: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<User[]>([]); // Simplified state type
  const [userData, setUserData] = useState<UserData | null>(null); // Ensure userData is null initially

  const navigate = useNavigate();

  const fetchNotes = async (token: string) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/notes/getNotes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setUser(response.data.data || []);
        localStorage.setItem("user", JSON.stringify(response.data.data));
      } else {
        toast.error(response.data.message || "Failed to fetch notes.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching notes.");
    }
  };

  const initializeDashboard = () => {
    const storedUserData = localStorage.getItem("userData");
    const token = localStorage.getItem("token");

    if (storedUserData && token) {
      setUserData(JSON.parse(storedUserData));
      fetchNotes(token);
    } else {
      setIsLogin(false);
      toast.error("Please log in to continue.");
      navigate("/login");
    }
  };

  useEffect(() => {
    initializeDashboard();
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("user");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLogin ? (
        <>
          <div className="flex justify-between p-5 border-b-2 bg-white">
            <div className="flex justify-center items-center gap-5">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <button
              onClick={signOut}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex w-[90%] flex-col justify-center items-center gap-5 border-2 m-5 rounded-lg shadow-md p-5 bg-white">
              <img
                className="w-[65px] rounded-full"
                src={userData?.image}
                alt="User Avatar"
              />
              <h1 className="text-3xl font-bold">Welcome, {userData?.name}!</h1>
              <h2 className="text-lg text-gray-600">{userData?.email}</h2>
            </div>
            <button
              className="bg-blue-500 py-2 px-6 w-[365px] text-white rounded-md"
              onClick={() => navigate("/createNote")}
            >
              Create Note
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-5">
            {user?.map((element) => (
              <Card
                key={element._id}
                heading={element.title}
                id={element._id}
                onDelete={(deletedId) => {
                  setUser(
                    (prevUser) =>
                      prevUser?.filter((note) => note._id !== deletedId) || []
                  );
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col text-black justify-center h-screen items-center gap-5">
          <h1 className="text-3xl font-bold">Welcome to NOTES</h1>
          <button
            className="bg-blue-500 text-white py-2 px-6 w-[365px] rounded-sm"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-6 w-[365px] rounded-sm"
            onClick={() => navigate("/signUp")}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
