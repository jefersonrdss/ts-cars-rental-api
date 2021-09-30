import { Router } from "express";

import ensureAdmin from "../middlewares/ensureAdmin";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post(
    "/cars",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get(
    "/cars/available",
    listCarsController.handle
)

export { carsRoutes }