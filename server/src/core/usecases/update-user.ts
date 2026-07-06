import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { hashPassword } from '../utils/password';
import { Generator } from "../interfaces/generator.interface";
import { RegisterInput } from "../../application/dto/auth.dto";
import { FileStorage } from "../interfaces/file-storage.interface";
import { File } from "../../application/dto/file.dto";

export class UpdateUsers {
    constructor(
        private userRepository: UserRepository,
        private fileStorage: FileStorage,
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

    async updateAvatar(userId: string, file: File): Promise<string|null> {
        const user = await this.userRepository.findById(userId);
        if (!user) return null;

        const id = `${this.generator.generateInt(10000000, 99999999)}`
        const avatarUrl = await this.fileStorage.storeFile(file, id);

        const updatedUser = new User(
            user.id,
            user.username,
            user.email,
            user.password,
            user.firstname,
            user.lastname,
            user.phoneNumber,
            id
        )

        await this.userRepository.update(updatedUser);
        return avatarUrl;
    }
}
