const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json"; 
const routes = ["./app.js"]; 

const doc = {
  info: {
    title: "My API",
    description: "API for Ngee Ann Poly library books",
  },
  host: "localhost:3000", 
};

swaggerAutogen(outputFile, routes, doc);