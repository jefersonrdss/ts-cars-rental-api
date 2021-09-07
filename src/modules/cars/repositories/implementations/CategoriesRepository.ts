import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    /** IMPLEMENTS METHODS OF INTERFACE */
    // metodo list
    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return  categories;
    }

    // metodo create
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        // criando o objecto da entidade para save no database
        const category = this.repository.create({
            name,
            description
        });

        await this.repository.save(category);
    }

    // metodo find by name
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
