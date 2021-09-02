import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationsRoutes = Router();

// Route for create specifications
specificationsRoutes.post("/specifications", (request, response) => {
    return createSpecificationController.handle(request, response);
});

// Route for get specifications
specificationsRoutes.get("/specifications", (request, response) => {
    return listSpecificationsController.handle(request, response);
});


export { specificationsRoutes };
