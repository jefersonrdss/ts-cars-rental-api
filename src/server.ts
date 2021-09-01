import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specification.routes";

const server = express();
server.use(express.json());

server.use(categoriesRoutes);
server.use(specificationsRoutes);

server.listen(3333, () => console.log("Server is running!"));
