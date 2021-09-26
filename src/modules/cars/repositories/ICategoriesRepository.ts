import { Category } from "../infra/typeorm/entities/Category";

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

// metodos for implements
interface ICategoriesRepository {
    create({name, description}: ICreateCategoryDTO): Promise<void>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO, IUpdateCategoryDTO };