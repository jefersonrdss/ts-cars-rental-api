import { Specification } from "../model/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
    private specifications: Specification[];

    // constructor inicialize specifications array
    constructor() {
        this.specifications = [];
    }

    // metodo list
    list(): Specification[] { return this.specifications; }

    // metodo create
    create({ name, description }: ICreateSpecificationDTO): void {
        
        // passando atributos de specification
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification); // inserting specifications
    }

    // metodo find by name
    findByName(name: string): Specification {
        const specification = this.specifications.find((specification) => specification.name === name);
        return specification;
    }
}

export { SpecificationsRepository };
