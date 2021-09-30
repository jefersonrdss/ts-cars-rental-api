import { Router } from "express";
import multer from 'multer';

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUser/ListUsersController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "@config/upload";
import ensureAdmin from "../middlewares/ensureAdmin";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

// create user
usersRoutes.post(
    "/users",
    ensureAuthenticated,
    createUserController.handle
);

// list users
usersRoutes.get(
    "/users",
    ensureAuthenticated,
    ensureAdmin,
    listUsersController.handle
);

// add user avatar
usersRoutes.patch(
    "/users/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);


export { usersRoutes };