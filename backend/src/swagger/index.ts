import { authSwagger } from "./auth.swagger";
import { categorySwagger } from "./categroy.swagger";

export const swaggerDocs = {
  ...authSwagger,
  ...categorySwagger,
};
