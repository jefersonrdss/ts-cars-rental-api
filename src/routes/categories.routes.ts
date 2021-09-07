import { Router } from "express";

import createCategoryController from "../modules/cars/useCases/createCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";
import importCategoryController from "../modules/cars/useCases/importCategory";

// for import file
import multer from "multer";
const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

// Route for create categories
categoriesRoutes.post("/categories", (request, response) => {
    return createCategoryController().handle(request, response);
});

// Route for get categories
categoriesRoutes.get("/categories", (request, response) => {
    return listCategoriesController().handle(request, response);
});

categoriesRoutes.post("/categories/import", upload.single("file"), (request, response) => {
    return importCategoryController().handle(request, response);
})

export { categoriesRoutes };
