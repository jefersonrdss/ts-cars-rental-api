import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("Should be able to add a new specification to the car", async () => {

        //** Create cars and specifications */
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Brand Test",
            category_id: "uuid-category-test"
        });

        const specification1 = await specificationsRepositoryInMemory.create({
            name: "Specification Test 1",
            description: "Description Specification Test 1"
        });

        const specification2 = await specificationsRepositoryInMemory.create({
            name: "Specification Test 2",
            description: "Decription Specification Test 2"
        });
        //** end create cars and specifications */


        const specificationsCars1 = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification1.id]
        });

        expect(specificationsCars1).toHaveProperty("specifications");
        expect(specificationsCars1.specifications.length).toBe(1);

        const specificationsCars2 = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification1.id, specification2.id]
        });

        expect(specificationsCars2.specifications.length).toBe(2);
    });

    it("Should not be able to add a new specification to a non-existent car", () => {
        
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
    
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });
});