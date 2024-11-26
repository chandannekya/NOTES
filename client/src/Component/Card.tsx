import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
interface CardProps {
  heading: string;
  id: string;
  onDelete: (id: string) => void; // Add callback for deletion
}

const Card: React.FC<CardProps> = ({ heading, id, onDelete }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const handleCardClick = () => {
    navigate(`/notes/${id}`); // Navigate to the detailed page
  };

  const deleteNote = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Deleting note with id:", id);

      const response = await axios.delete(`${apiUrl}/api/notes/deleteNote`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
        data: { _id: id.trim() }, // Pass note ID in request body
      });

      if (response.statusText === "OK") {
        toast.success("Note Deleted");
        onDelete(id); // Notify the parent component
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Can't Delete note");
    }
  };

  return (
    <div
      className="border-2 flex justify-between p-4 w-[365px] m-5 rounded-md shadow-md"
      onClick={handleCardClick}
    >
      <h1 className="text-xl font-semibold">{heading}</h1>
      <button onClick={deleteNote}>
        <RiDeleteBin6Fill />
      </button>
    </div>
  );
};

export default Card;
