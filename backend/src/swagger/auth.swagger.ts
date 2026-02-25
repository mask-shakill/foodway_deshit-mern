export const authSwagger = {
  "/auth/login": {
    post: {
      summary: "Login or Register user with Google",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  description: "Firebase ID Token from Google Login",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "User authenticated successfully" },
        401: { description: "Invalid token" },
      },
    },
  },
};
