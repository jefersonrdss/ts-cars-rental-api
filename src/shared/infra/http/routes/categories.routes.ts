import { Router } from "express";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";

// for import file
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import ensureAdmin from "../middlewares/ensureAdmin";
const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router(); // for create routes

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

/** ROUTES */
categoriesRoutes.post(
    "/categories",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
); // Route for create categories

categoriesRoutes.get(
    "/categories",
    ensureAuthenticated,
    listCategoriesController.handle
); // Route for get categories

categoriesRoutes.post(
    "/categories/import",
    ensureAuthenticated,
    ensureAdmin,
    upload.single("file"),
    importCategoryController.handle
); // Route for create all categories from imported file

export { categoriesRoutes };
