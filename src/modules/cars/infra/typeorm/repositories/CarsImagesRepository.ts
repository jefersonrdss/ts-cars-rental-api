import { ICarsImagesRepository, ICreateCarImageDTO } from "@modules/cars/repositories/ICarsImagesRepository";
import { Repository } from 'typeorm';
import { CarImage } from "../entities/CarImage";
import { getRepository } from 'typeorm';


class CarsImagesRepository implements ICarsImagesRepository {
    
    private repository: Repository<CarImage>

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
        
        const carImage = this.repository.create({
            car_id,
            image_name
        });

        await this.repository.save(carImage);

        return carImage;
    }

}

export { CarsImagesRepository }