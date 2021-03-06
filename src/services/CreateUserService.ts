import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}
class CreateUserService {

    async execute({ name, email, admin = false, password }: IUserRequest) {
        const usersRepository = getCustomRepository(UserRepositories);

        if (!email) {
            throw new Error("Incorrect Email");
        }

        const userAlredyExists = await usersRepository.findOne({
            email
        });

        if (userAlredyExists) {
            throw new Error("User Already Exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name, email, admin, password: passwordHash
        });

        await usersRepository.save(user);
        return user;
    }
}

export { CreateUserService }