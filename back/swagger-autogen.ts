import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/router.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, {
  info: {
    version: "v1.0.0",
    title: "elocality",
    description: "elocality-apis",
  },
  servers: [
    {
      url: "http://localhost:4009",
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
});
