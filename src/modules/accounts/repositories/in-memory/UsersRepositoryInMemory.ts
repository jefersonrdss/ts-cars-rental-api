import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository, IUsersRepositoryDTO } from "@modules/accounts/repositories/IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {

    private users: User[] = [];

    async create({ name, email, password, driver_license }: IUsersRepositoryDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
        });

        this.users.push(user);
    }

    async updateAvatar(id: string, filename: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }
}

export { UsersRepositoryInMemory}