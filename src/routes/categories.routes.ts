import { Router } from "express";
import multer from "multer";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const upload = multer({ dest: "./tmp" });
const categoriesRoutes = Router();

// Route for create categories
categoriesRoutes.post("/categories", (request, response) => {
    return createCategoryController.handle(request, response);
});

// Route for get categories
categoriesRoutes.get("/categories", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/categories/import", upload.single("file"), (request, response) => {
    const { file } = request;
    return response.status(200).json(file);
})

export { categoriesRoutes };
