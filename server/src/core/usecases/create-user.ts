import { Injectable } from "@nestjs/common";
import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { hashPassword } from '../utils/password';
import { UserDTO } from "../../application/dto/user.dto";
import { UserMapper } from "../mappers/user.mapper";
import { RegisterInput } from "../../application/dto/auth.dto";
import { IdGenerator } from "../interfaces/uuid-generator.interface";

@Injectable()
export class CreateUsers {
    constructor(private userRepository: UserRepository, private generator: IdGenerator) {}

    async createUser(registerInput: RegisterInput) : Promise<User | null> {
        const user = await this.userRepository.findByEmail(registerInput.email);
        if (user) return null;

        const hashedPassword = await hashPassword(registerInput.password);

        const createdUser = new User(
            this.generator.generate(),
            registerInput.username,
            registerInput.email,
            hashedPassword,
            registerInput.firstname,
            registerInput.lastname,
            registerInput.phoneNumber
        )

        const domain = await this.userRepository.save(createdUser);
        return domain;
    }
}
