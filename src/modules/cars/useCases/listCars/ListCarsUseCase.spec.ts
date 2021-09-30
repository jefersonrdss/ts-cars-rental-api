import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it("Should be able to list all available cars", async () => {

        await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Brand Test",
            category_id: "uuid-category-test"
        });
        //car.available = false;

        await carsRepositoryInMemory.create({
            name: "Car 2 Test",
            description: "Car 2 Description Test",
            daily_rate: 100,
            license_plate: "DEF-1234",
            fine_amount: 100,
            brand: "Brand 2 Test",
            category_id: "uuid-category-test2"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toHaveLength(2);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "New Car Test Name",
            description: "Car Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Brand Test",
            category_id: "uuid-category-test"
        });

        const carFinded = await listCarsUseCase.execute({
            name: "New Car Test Name"
        });

        expect(carFinded).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "New Car Test Brand",
            description: "Car Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Brand Test",
            category_id: "uuid-category-test"
        });

        const carFinded = await listCarsUseCase.execute({
            brand: "Brand Test"
        });

        expect(carFinded).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "New Car Test Category",
            description: "Car Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Brand Test",
            category_id: "uuid-category-test"
        });

        const carFinded = await listCarsUseCase.execute({
            category_id: "uuid-category-test"
        });

        expect(carFinded).toEqual([car]);
    });
});