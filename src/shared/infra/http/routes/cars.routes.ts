import { Router } from "express";

import uploadConfig from "@config/upload";
import ensureAdmin from "../middlewares/ensureAdmin";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

// for import file
import multer from "multer";

const uploadImages = multer(uploadConfig.upload("./tmp/cars"));

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
    "/cars",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.post(
    "/cars/specifications/:id",
    createCarSpecificationController.handle
);

carsRoutes.get(
    "/cars/available",
    ensureAuthenticated,
    ensureAdmin,
    listCarsController.handle
);

carsRoutes.post(
    "/cars/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    uploadImages.array("images"),
    uploadCarImagesController.handle
)

export { carsRoutes }