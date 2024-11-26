import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard"; // Replace with actual paths
import LogIn from "./Pages/Login"; // Replace with actual paths
import SignUp from "./Pages/SignUp"; // Replace with actual paths

import CreateNote from "./Pages/CreateNote";
import NoteDetail from "./Pages/NoteDetail";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<Dashboard />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;
