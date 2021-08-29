import { Router } from "express";
import { v4 as uuidv4, validate } from "uuid";

const categoriesRoutes = Router();

const categories = []; // list of categories

// Route for create categories
categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    const category = {
        id: uuidv4(),
        name,
        description,
        created_at: new Date(),
    };
    categories.push(category); // inserting categories

    return response.status(201).json(category);
});

// Route for get categories
categoriesRoutes.get("/categories", (request, response) => {
    // return all categories
    return response.status(200).json(categories);
});

// Route for update categories
categoriesRoutes.put("/categories/:id", (request, response) => {
    const { id } = request.params;
    const { name, description } = request.body;

    // validate uuid
    if (!validate(id)) {
        return response
            .status(400)
            .json({ message: "Category ID is not valid" });
    }

    // verify if category exists
    const category = categories.find((category) => category.id === id);
    if (!category) {
        return response.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    category.description = description;

    return response.status(201).json(category);
});

// Route for delete categories
categoriesRoutes.delete("/categories/:id", (request, response) => {
    const { id } = request.params;

    // validate uuid
    if (!validate(id)) {
        return response
            .status(400)
            .json({ message: "Category ID is not valid" });
    }

    // verify if category exists
    const category = categories.find((category) => category.id === id);
    if (!category) {
        return response.status(404).json({ message: "Category not found" });
    }

    // delete category
    const categoryIndex = categories.indexOf(category);
    categories.splice(categoryIndex, 1);

    return response.status(204).send();
});

export { categoriesRoutes };
