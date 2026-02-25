import express, { Application, Router } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
const apiRouter = Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/categories", categoryRoutes);

app.use("/api", apiRouter);

app.use(globalErrorHandler);

export default app;
