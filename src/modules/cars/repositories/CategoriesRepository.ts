import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO, IUpdateCategoryDTO } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    // metodo list
    list(): Category[] {
        return this.categories;
    }

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

    // metodo update
    update({ id, name, description }: IUpdateCategoryDTO): void {
        const category = this.categories.find((category) => category.id === id);
        category.name = name;
        category.description = description;
    }

    // metodo find by name
    findByName(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }

    // metodo find by id
    findById(id: string): Category {
        const category = this.categories.find((category) => category.id === id);
        return category;
    }

    // metodo delete
    delete(id: string): void {
        const category = this.findById(id);
        const categoryIndex = this.categories.indexOf(category);
        this.categories.splice(categoryIndex, 1);
    }

    // constructor inicialize categories array
    constructor() {
        this.categories = [];
    }
}

export { CategoriesRepository };
