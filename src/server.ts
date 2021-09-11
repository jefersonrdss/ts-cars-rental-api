import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { AppError } from "./errors/AppError";


const server = express();

server.use(express.json());
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(router);

// Middleware de erros
server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            error: error.message
        });
    }
    
    return response.status(500).json({
        error: `Internal Server Error: ${error.message}`
    });
});


server.listen(3333, () => console.log("Server is running!"));
