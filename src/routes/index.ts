import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();

router.use(usersRoutes);
router.use(authenticateRoutes);

// Authencicated routes
router.use(ensureAuthenticated); // Middleware for ensure user authenticated
router.use(categoriesRoutes);
router.use(specificationsRoutes);

export { router };
