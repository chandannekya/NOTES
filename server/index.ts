import express from "express";
import cors from "cors";
import USerRoutes from "./routes/user.routes";
import NoteRoutes from "./routes/notes.routes";
import { DBConnect } from "./connections/mongoDB";
import cookieParser from "cookie-parser";

const app = express();
DBConnect();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/Auth", USerRoutes);
app.use("/api/notes", NoteRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
