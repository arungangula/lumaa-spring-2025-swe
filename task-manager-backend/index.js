import http from "http";
import dotenv from "dotenv";
import { handleRequest } from "./routes.js";

dotenv.config();

// Creating and running the server
// PORT from .env
const PORT = process.env.PORT || 5000;

// gettting all the routes
const server = http.createServer(handleRequest);

// Running the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});