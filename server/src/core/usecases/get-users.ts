import { Injectable } from "@nestjs/common";
import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";

@Injectable()
export class GetUsers {

    constructor(private readonly userRepository: UserRepository) {}

    async getUserByEmail(email: string) : Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        return user || null;
    }
    async getUserByUsername(username: string) : Promise<User | null> {
        const user = await this.userRepository.findByUsername(username);
        return user || null;
    }
    async getUserById(id: string) : Promise<User | null> {
        const user = await this.userRepository.findById(id);
        return user || null;
    }
    async getAllUsers() : Promise<User[]> {
        const users = await this.userRepository.findAll();
        return users;
    }
}
