import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Route for get categories
categoriesRoutes.get("/categories", (request, response) => {
    // return all categories
    const all = categoriesRepository.list();
    return response.status(200).json(all);
});

// Route for create categories
categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    try {
        createCategoryService.execute({ name, description });
        return response.status(201).send();
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export { categoriesRoutes };
