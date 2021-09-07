import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {

    constructor (private listCategoryUseCase: ListCategoriesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        
        const categories = await this.listCategoryUseCase.execute();
        return response.status(200).json(categories);
    }
}

export { ListCategoriesController };