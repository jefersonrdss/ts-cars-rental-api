import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from 'tsyringe';
import { User } from "@modules/accounts/infra/typeorm/entities/User";

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