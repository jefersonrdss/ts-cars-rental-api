import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController();

/** ROUTES */
specificationsRoutes.post("/specifications", createSpecificationController.handle); // Route for create specifications
specificationsRoutes.get("/specifications", listSpecificationsController.handle); // Route for list all specifications

export { specificationsRoutes };
