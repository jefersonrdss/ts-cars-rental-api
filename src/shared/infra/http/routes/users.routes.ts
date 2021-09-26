import { Router } from "express";
import multer from 'multer';

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUser/ListUsersController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "@config/upload";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/users", createUserController.handle);

// Authenticated Routes
usersRoutes.get("/users", listUsersController.handle );
usersRoutes.patch("/users/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);


export { usersRoutes };