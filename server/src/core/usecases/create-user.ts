import { Injectable } from "@nestjs/common";
import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { hashPassword } from '../utils/password';
import { UserDTO } from "../../application/dto/user.dto";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class CreateUsers {
    constructor(private userRepository: UserRepository) {}

    async createUser(registerInput: { username: string; email: string; password: string }) : Promise<UserDTO | null> {
        const user = await this.userRepository.findByEmail(registerInput.email);
        if (user) return null;

        const hashedPassword = await hashPassword(registerInput.password);
        const domain = await this.userRepository.save(registerInput.username, registerInput.email, hashedPassword);
        const dto = UserMapper.toDTO(domain)
        return dto;
    }
}
