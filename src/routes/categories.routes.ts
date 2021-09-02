import { Router } from "express";
import { createCategoryController, categoriesRepository } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();

// Route for create categories
categoriesRoutes.post("/categories", (request, response) => {
    return createCategoryController.handle(request, response);
});

// Route for get categories
categoriesRoutes.get("/categories", (request, response) => {
    return response.status(200).json(categoriesRepository.list());
});

export { categoriesRoutes };
