import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {

        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists) {
            throw new AppError("Car does not exists!");
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        // // just will add new specification case does'n exists in car
        // if(carExists.specifications !== undefined) {
        //     specifications.filter(specification => {
        //         if(!carExists.specifications.includes(specification)){
        //             carExists.specifications.push(specification);
        //         }
        //     });
        // } else {
        //     carExists.specifications = specifications;
        // }
        // //** */


        carExists.specifications = specifications;

        const car = await this.carsRepository.create(carExists);

        return car;
    }
}

export { CreateCarSpecificationUseCase }