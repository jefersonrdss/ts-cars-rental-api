import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from 'typeorm';


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
        } = data;

        const car = this.repository.create({
            id,
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications
        });

        await this.repository.save(car);

        return car;
    }

    async findAvailableCars(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {

        const carsQuery = this.repository
        .createQueryBuilder("cars")
        .where("cars.available = :available", { available: true });

        if(name) {
            carsQuery.andWhere("cars.name = :name", { name });
        }

        if(brand) {
            carsQuery.andWhere("cars.brand = :brand", { brand });
        }

        if(category_id) {
            carsQuery.andWhere("cars.category_id = :category_id", { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        
        const car = await this.repository.findOne({license_plate});
        return car;
    }

    async findById(id: string): Promise<Car> {
        const car  = await this.repository.findOne(id);
        return car;
    }
}

export { CarsRepository }