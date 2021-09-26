import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/cars", createCarController.handle);

export { carsRoutes }