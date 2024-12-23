const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json"; // Output file for the spec
const routes = ["./app.js"]; // Path to your API route files

const doc = {
  info: {
    title: "SustainableMe",
    description: "The API Endpoints for the SustainableMe website",
  },
  host: "localhost:3000",
};

swaggerAutogen(outputFile, routes, doc);