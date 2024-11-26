import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authenticated. Please log in first.");
      navigate("/login");
      return;
    }

    if (!title || !content) {
      toast.error("Please fill in both the title and content.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL || `http://localhost:3000`}/api/notes/createNote`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success("Note created successfully!");
        navigate("/"); // Redirect to the dashboard
      } else {
        toast.error(response.data.message || "Failed to create note.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the note.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-[500px]">
        <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleCreateNote}
          >
            Save Note
          </button>
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-md"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
