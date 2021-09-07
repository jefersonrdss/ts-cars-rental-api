import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";


class ListSpecificationsController {

    async handle(request: Request, response: Response): Promise<Response> {
        
        const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase); // new ListSpecificationUseCase()

        const specifications = await listSpecificationsUseCase.execute();
        return response.status(200).json(specifications);
    }
}

export { ListSpecificationsController };