import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";
import { IUsersRepository, IUsersRepositoryDTO } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository") //new UsersRepository
        private usersRepository: IUsersRepository
    ) {}
    
    async execute({ name, email, password, driver_license }: IUsersRepositoryDTO): Promise<void> {

        // verify if email already exists
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        
        if (userAlreadyExists) {
            throw new AppError("User's email already registered");
        }

        // insert on database
        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });
    }
}

export { CreateUserUseCase };