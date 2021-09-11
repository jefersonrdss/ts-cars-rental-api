import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from 'tsyringe';
import { User } from "../../entities/User";

@injectable()
class ListUsersUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(): Promise<User[]> {

        const users = await this.usersRepository.list();
        return users;
    }

}

export { ListUsersUseCase };