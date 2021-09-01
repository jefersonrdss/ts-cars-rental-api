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

    const createCategoryService = new CreateCategoryService(
        categoriesRepository
    );
    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

// Route for update categories
categoriesRoutes.put("/categories/:id", (request, response) => {
    const { id } = request.params;
    const { name, description } = request.body;

    // verify if category exists
    const categoryExists = categoriesRepository.findById(id);
    if (!categoryExists) {
        return response.status(404).json({ error: "Category not found" });
    }

    categoriesRepository.update({ id, name, description });
    return response.status(201).send();
});

// Route for delete categories
categoriesRoutes.delete("/categories/:id", (request, response) => {
    const { id } = request.params;

    // verify if category exists
    const categoryExists = categoriesRepository.findById(id);
    if (!categoryExists) {
        return response.status(404).json({ error: "Category not found" });
    }

    categoriesRepository.delete(id);
    return response.status(204).send();
});

export { categoriesRoutes };
