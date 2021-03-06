import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {

    private repository: Repository<Specification>
    
    constructor() {
        this.repository = getRepository(Specification);
    }

    /** IMPLEMENTS INTERFACE METHODS */
    // metodo list
    async list(): Promise<Specification[]> {
        
        const specifications = await this.repository.find();
        return specifications;
    }

    // metodo create
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        
        // cria uma instancia da entidade specification para save
        const specification = this.repository.create({
            name,
            description
        });

        await this.repository.save(specification);

        return specification;
    }

    // metodo find by name
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }
}

export { SpecificationsRepository };
