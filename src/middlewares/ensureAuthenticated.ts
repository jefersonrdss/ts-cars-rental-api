import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppError";


interface IPayLoad {
    sub: string
}

/**
 * Verificar se o token foi passado na requisição
 * Verificar se o token é válido
 * Verificar se o user_id dentro do token existe
 */
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization; // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lI...
    
    // Verificar se o token foi passado na requisição
    if (!authToken) {
        throw new AppError("Token missing!", 401);
    }
    
    // extrair apenas o token
    const [, token] = authToken.split(" "); // [0] = Bearer, [1] = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lI...
    
    // Verify token
    try {
        
        const { sub: user_id } = verify(token, "327388feaacb2bdcd507d18ebe6ced7b") as IPayLoad; // force return verify function as IPayLoad

        const usersRepository = new UsersRepository();
        const userExists = await usersRepository.findById(user_id);

        // Verificar se usuário existe
        if (!userExists) {
            throw new AppError("User does'n exists!", 401);
        }
        
        request.user_id = user_id

        next();
        
    } catch (error) {
        
        throw new AppError(`Invalid token or ${error.message}`, 401);
    }
}