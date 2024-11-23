import express from "express";
import cors from "cors";
import USerRoutes from "./routes/user.routes";
import { DBConnect } from "./connections/mongoDB";
const app = express();
DBConnect();
app.use(express.json());

app.use("/api/Auth", USerRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
