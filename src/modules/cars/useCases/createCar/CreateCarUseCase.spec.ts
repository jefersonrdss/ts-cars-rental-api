import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase; 

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able create a new car", async () => {

        const car = {
            name: "Car Test",
            description: "Car Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Brand Test",
            category_id: "uuid-category-test"
        }

        const carCreated = await createCarUseCase.execute(car);

        expect(carCreated).toHaveProperty("id");
    });


    it("Should not be able create car that already exists", async () => {

        expect(async () => {
            
            await createCarUseCase.execute({
                name: "Car Test",
                description: "Car Description Test",
                daily_rate: 100, 
                license_plate: "ABC-1234",
                fine_amount: 100,
                brand: "Brand Test",
                category_id: "uuid-category-test"
            });
    
            await createCarUseCase.execute({
                name: "Car Test 2",
                description: "Car Description Test 2",
                daily_rate: 200,
                license_plate: "ABC-1234", //=> same license_plate
                fine_amount: 200,
                brand: "Brand Test 2",
                category_id: "uuid-category-test-2"
            });

        }).rejects.toBeInstanceOf(AppError);
    });


    it("Should be able to create car with available true by default", async () => {

        const car = await createCarUseCase.execute({
            name: "Car Available Test",
            description: "Car Description Test",
            daily_rate: 100, 
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Brand Test",
            category_id: "uuid-category-test"
        });

        expect(car.available).toBe(true);
    })
});