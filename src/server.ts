import express from "express";
import "./database";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";


const server = express();

server.use(express.json());
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(router);

server.listen(3333, () => console.log("Server is running!"));
