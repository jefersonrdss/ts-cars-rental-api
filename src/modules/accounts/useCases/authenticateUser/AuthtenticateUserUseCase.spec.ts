import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepositoryDTO } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { AppError } from '@shared/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able authenticate an user", async () => {

        const user: IUsersRepositoryDTO = {
            name: "User Test",
            email: "user@test.com",
            password: "1234",
            driver_license: "12345"
        }

        await createUserUseCase.execute(user);

        const authenticated = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(authenticated).toHaveProperty("token");
    });


    it("Should not be able to authenticate a nonexistent user", async () => {

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "falseUser@test.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });


    it("Should not be able to authenticate with incorrect password", async () => {
    
        expect(async () => {

            const user : IUsersRepositoryDTO = {
                name: "User Test",
                email: "test@test.com",
                password: "4321",
                driver_license: "54321"
            }
    
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "IncorrectPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});