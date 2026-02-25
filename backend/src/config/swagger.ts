import swaggerJSDoc from "swagger-jsdoc";
import { swaggerDocs } from "../swagger";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FoodWay API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:5000/api" }],
    paths: swaggerDocs,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [],
};

export const specs = swaggerJSDoc(options);
