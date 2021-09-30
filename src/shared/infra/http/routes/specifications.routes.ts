import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import ensureAdmin from "../middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController();

/** ROUTES */
specificationsRoutes.post(
    "/specifications",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
); // Route for create specifications

specificationsRoutes.get(
    "/specifications",
    ensureAuthenticated,
    listSpecificationsController.handle
); // Route for list all specifications

export { specificationsRoutes };
