import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository"


class CarsRepositoryInMemory implements ICarsRepository {
    
    private cars: Car[] = []

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

        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });

        this.cars.push(car);

        return car;
    }
    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }
}

export { CarsRepositoryInMemory }