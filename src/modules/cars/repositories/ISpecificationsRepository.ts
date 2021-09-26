import { Specification } from "../infra/typeorm/entities/Specification";

// Interface Create Specification DTO
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository{
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
}

export { ICreateSpecificationDTO, ISpecificationRepository };