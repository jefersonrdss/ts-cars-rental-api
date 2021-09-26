import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from 'typeorm';


class CarsRepository implements ICarsRepository {

    private carsRepository: Repository<Car>

    constructor() {
        this.carsRepository = getRepository(Car);
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        } = data;

        const car = this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });

        await this.carsRepository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        
        const car = await this.carsRepository.findOne({license_plate});
        return car;
    }

}

export { CarsRepository }