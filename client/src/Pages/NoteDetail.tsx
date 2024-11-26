import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface NoteDetails {
  title: string;
  content: string;
}

const NoteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the note ID from URL
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;

  const fetchNoteDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not authenticated");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiUrl}/api/notes/note?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      });

      console.log(response.data.note);
      if (response.data.success) {
        setNote(response.data.note);
      } else {
        toast.error("Failed to fetch note details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching note details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoteDetails();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!note) {
    return (
      <div className="text-center mt-10">
        <p>Note not found</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      <>
        <h1 className="text-3xl font-bold text-center pt-5 mb-5">Note</h1>
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <div className="border-2 p-6 shadow-lg bg-white max-w-md w-full rounded-lg">
            <h1 className="text-4xl font-bold mb-6 text-center">
              {note.title}
            </h1>
            <p className="text-gray-700 mb-5">{note.content}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-5 bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default NoteDetail;
