import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO, IUpdateCategoryDTO } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    // constructor inicialize categories array
    constructor() {
        this.categories = [];
    }

    // metodo list
    list(): Category[] { return this.categories; }

    // metodo create
    create({ name, description }: ICreateCategoryDTO): void {

        // passando atributos de categoria
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category); // inserting categories
    }

    // metodo find by name
    findByName(name: string): Category {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}

export { CategoriesRepository };
