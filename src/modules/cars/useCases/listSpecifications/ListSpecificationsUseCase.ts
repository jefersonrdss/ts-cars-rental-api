import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

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