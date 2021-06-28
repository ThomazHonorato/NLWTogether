import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {

        const userRepositories = getCustomRepository(UserRepositories)

        // Verificar se o email existe.
        const user = await userRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password Incorrect!")
        }

        //Verificar se a senha está correta.
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Password/Email incorrect!");
        }

        //Gerar o Token de acesso.

        const token = sign({
            email: user.email
        }, "502439adee4dff669b567d25d9cca20a", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService }