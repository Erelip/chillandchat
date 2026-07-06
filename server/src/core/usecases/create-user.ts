import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { hashPassword } from '../utils/password';
import { Generator } from "../interfaces/generator.interface";
import { RegisterInput } from "../../application/dto/auth.dto";

export class CreateUsers {
    constructor(
        private userRepository: UserRepository,
        private generator: Generator
    ) {}

    async createUser(registerInput: RegisterInput) : Promise<User | null> {
        const user = await this.userRepository.findByEmail(registerInput.email);
        if (user) return null;

        const hashedPassword = await hashPassword(registerInput.password);

        const createdUser = new User(
            this.generator.generateUUID(),
            registerInput.username,
            registerInput.email,
            hashedPassword,
            registerInput.firstname,
            registerInput.lastname,
            registerInput.phoneNumber,
            null
        )

        const domain = await this.userRepository.save(createdUser);
        return domain;
    }
}
