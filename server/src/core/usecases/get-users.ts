import { Injectable } from "@nestjs/common";
import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { UserMapper } from "../mappers/user.mapper";
import { UserDTO } from "../../application/dto/user.dto";

@Injectable()
export class GetUsers {

    constructor(private readonly userRepository: UserRepository) {}

    async getUserByEmail(email: string) : Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }
    async getUserByUsername(username: string) : Promise<User | null> {
        return await this.userRepository.findByUsername(username);
    }
    async getUserById(id: string) : Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async getAllUsersButMe(id: string): Promise<User[]>  {
        return await this.userRepository.findAllButMe(id);
    }
}
