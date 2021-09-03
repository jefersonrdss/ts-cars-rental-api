import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    
    constructor(private importCategoriesUseCase: ImportCategoryUseCase) {}
    
    handle(request: Request, response: Response): Response {
        
        const { file } = request;

        try{
            this.importCategoriesUseCase.execute(file);
            return response.status(200).send();
        } catch(error){
            console.log(error.message);
            //return response.status(400).json({ error: error.message });
        }
    }
}

export { ImportCategoryController };