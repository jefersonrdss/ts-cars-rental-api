import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create Specification", () =>{

    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepositoryInMemory);
    });

    it("Shoud be able create a new specification", async () =>{

        const specification = {
            name: "Specification Test",
            description: "Specification Description Test"
        }

        await createSpecificationUseCase.execute(specification);

        const specificationCreated = await specificationsRepositoryInMemory.findByName(specification.name);

        expect(specificationCreated).toHaveProperty("id");
    });
});