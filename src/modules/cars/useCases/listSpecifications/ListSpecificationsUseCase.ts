import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}

    async execute(): Promise<Specification[]> {

        const specifications = this.specificationsRepository.list();
        return specifications;
    }
}

export { ListSpecificationsUseCase };