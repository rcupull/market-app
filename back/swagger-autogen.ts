import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/router.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, {
  info: {
    version: "v1.0.0",
    title: "Asere Market",
    description: "Asere Market API"
  },
  servers: [
    {
      url: "http://localhost/api-services",
      description: ""
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{ bearerAuth: [] }]
});
