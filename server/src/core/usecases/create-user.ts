import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { hashPassword } from '../utils/password';
import { Generator } from "../interfaces/generator.interface";
import { CreateUserCommand } from "../models/create-user.command";

export class CreateUsers {
    constructor(
        private userRepository: UserRepository,
        private generator: Generator
    ) {}

    async createUser(command: CreateUserCommand) : Promise<User | null> {
        const user = await this.userRepository.findByEmail(command.email);
        if (user) return null;

        const hashedPassword = await hashPassword(command.password);

        const createdUser = new User(
            this.generator.generateUUID(),
            command.username,
            command.email,
            hashedPassword,
            command.firstname,
            command.lastname,
            command.phoneNumber,
            null
        )

        const domain = await this.userRepository.save(createdUser);
        return domain;
    }
}
