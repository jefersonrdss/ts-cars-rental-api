import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";


class SpecificationsRepositoryInMemory implements ISpecificationRepository {

    private specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });

        this.specifications.push(specification);
    }

    async list(): Promise<Specification[]> {
        return this.specifications;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name);
    }

}

export { SpecificationsRepositoryInMemory }