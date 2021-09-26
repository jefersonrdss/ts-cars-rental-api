import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    /**
     * Verificar se usuário existe
     * Verificar se a senha está correta
     * Caso sucesso, gerar jsonwebtoken
     */
    async execute({ email, password }: IRequest): Promise<IResponse> {

        // Verificar se usuário existe
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        // verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        // Gerar o jsonwebtoken - sign(payload, secretOrPrivateKey, SignOptions)
        const token = sign({
            name: user.name,
            email
        }, "327388feaacb2bdcd507d18ebe6ced7b", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };