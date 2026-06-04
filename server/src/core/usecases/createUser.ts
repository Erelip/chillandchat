import { Injectable } from "@nestjs/common";
import { User } from "../../adapters/prisma/entities/user";
import { UserRepository } from "../interfaces/user.repository.interface";
import { hashPassword } from '../utils/password';

@Injectable()
export class CreateUsers {
    constructor(private userRepository: UserRepository) {}

    async createUser(registerInput: { username: string; email: string; password: string }) : Promise<User | null> {
        const user = await this.userRepository.findByEmail(registerInput.email);
        if (user) return null;

        const hashedPassword = await hashPassword(registerInput.password);
        const newUser = {
            username: registerInput.username,
            email: registerInput.email,
            password: hashedPassword,
        };
        const createdUser = await this.userRepository.save(newUser.username, newUser.email, newUser.password);
        return createdUser;
    }
}
