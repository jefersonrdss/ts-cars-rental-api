import { User } from "../infra/typeorm/entities/User";

// DTO Interface
interface IUsersRepositoryDTO {
    name: string;
    email: string;
    password: string;
    driver_license: string;
}

// methods for implements
interface IUsersRepository {
    create({ name, email, password, driver_license }: IUsersRepositoryDTO): Promise<void>;
    updateAvatar(id: string, filename: string): Promise<void>;
    list(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository, IUsersRepositoryDTO };