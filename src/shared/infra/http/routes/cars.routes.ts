import { Router } from "express";

import ensureAdmin from "../middlewares/ensureAdmin";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
    "/cars",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.post(
    "/cars/specifications/:id",
    createCarSpecificationController.handle
);

carsRoutes.get(
    "/cars/available",
    ensureAuthenticated,
    ensureAdmin,
    listCarsController.handle
);

export { carsRoutes }