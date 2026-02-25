import express, { Application, Router } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { specs } from "./config/swagger";
import productsRoutes from "./routes/product.routes";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const apiRouter = Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/categories", categoryRoutes);
apiRouter.use("/products", productsRoutes);

app.use("/api", apiRouter);
app.use(globalErrorHandler);

export default app;
