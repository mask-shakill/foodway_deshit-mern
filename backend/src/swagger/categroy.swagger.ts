export const categorySwagger = {
  "/categories": {
    post: {
      summary: "Create a new category",
      tags: ["Categories"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Fast Food" },
                slug: { type: "string", example: "fast-food" },
                image: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Category created successfully" },
        401: { description: "Unauthorized" },
        403: { description: "Admin access required" },
      },
    },
    get: {
      summary: "Get all categories",
      tags: ["Categories"],
      responses: {
        200: { description: "Success" },
      },
    },
  },
};
