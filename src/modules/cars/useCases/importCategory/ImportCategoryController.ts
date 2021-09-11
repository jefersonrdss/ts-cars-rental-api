import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        
        const importCategoriesUseCase = container.resolve(ImportCategoryUseCase);

        const { file } = request;
        
        await importCategoriesUseCase.execute(file);
        return response.status(200).send();
    }
}

export { ImportCategoryController };