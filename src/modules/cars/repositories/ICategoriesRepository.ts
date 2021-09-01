import { Category } from "../model/Category";

// Interface Create Category DTO
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

// Interface Update Category DTO
interface IUpdateCategoryDTO {
    id: string;
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({name, description}: ICreateCategoryDTO): void
    list(): Category[];
    findByName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO, IUpdateCategoryDTO };