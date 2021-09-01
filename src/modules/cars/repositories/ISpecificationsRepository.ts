import { Specification } from "../model/Specification";

// Interface Create Specification DTO
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository{
    create({ name, description }: Specification): void;
    list(): Specification[];
    findByName(name: string): Specification;
}

export { ICreateSpecificationDTO, ISpecificationRepository };