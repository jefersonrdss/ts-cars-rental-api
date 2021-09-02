import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {

    constructor (private listCategoryUseCase: ListCategoriesUseCase) {}

    handle(request: Request, response: Response): Response {
        return response.status(200).json(
            this.listCategoryUseCase.execute()
        );
    }
}

export { ListCategoriesController };