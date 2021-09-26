import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository") // new CategoriesRepository()
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        
        // to verify if category already exists
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new AppError("Category Already Exists", 403);
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
