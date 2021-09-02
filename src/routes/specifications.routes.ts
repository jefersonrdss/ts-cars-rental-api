import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

// Route for get specifications
specificationsRoutes.get("/specifications", (request, response) => {
    
    // return all specifications
    const all = specificationsRepository.list();
    return response.status(200).json(all);
});

// Route for create specifications
specificationsRoutes.post("/specifications", (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(specificationsRepository);

    try {
        createSpecificationService.execute({ name, description });
        return response.status(201).send();
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export { specificationsRoutes };
