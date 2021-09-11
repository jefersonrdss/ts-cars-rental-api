import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { IUsersRepository, IUsersRepositoryDTO } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    
    async create({ name, email, password, driver_license }: IUsersRepositoryDTO): Promise<void> {
        
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license
        });
        
        await this.repository.save(user);
        
    }
    
    async updateAvatar(id: string, filename: string): Promise<void> {
        const user = await this.repository.findOne(id);
        user.avatar = filename;
        await this.repository.save(user);
    }
    
    list(): Promise<User[]> {
        const users = this.repository.find({
            select: ["id", "name", "email", "driver_license", "isAdmin", "avatar", "created_at"]
        });
        return users;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({ email });
        return user;
    }
}

export { UsersRepository }