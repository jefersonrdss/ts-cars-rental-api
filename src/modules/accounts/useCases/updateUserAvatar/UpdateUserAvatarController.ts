import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        const { user_id, file: avatar_file } = request

        await updateUserAvatarUseCase.execute({ user_id, avatar_file });

        return response.status(201).send();
    }
}

export { UpdateUserAvatarController };