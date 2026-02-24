import express, { Application } from "express";
import cors from "cors";
import auth from "./routes/auth.routes";
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", auth);

export default app;
