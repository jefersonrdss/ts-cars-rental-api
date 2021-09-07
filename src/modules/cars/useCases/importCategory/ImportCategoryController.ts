import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    
    constructor(private importCategoriesUseCase: ImportCategoryUseCase) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        
        const { file } = request;

        try{
            await this.importCategoriesUseCase.execute(file);
            return response.status(200).send();
        } catch(error){
            return response.status(400).json({ error: error.message });
        }
    }
}

export { ImportCategoryController };