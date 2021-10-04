import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";

const router = Router();

router.use(usersRoutes); // users
router.use(authenticateRoutes); // for authenticate
router.use(categoriesRoutes); // categories
router.use(specificationsRoutes); // specifications
router.use(carsRoutes); // cars

export { router };
