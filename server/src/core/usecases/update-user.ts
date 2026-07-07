import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { Generator } from "../interfaces/generator.interface";
import { FileStorage } from "../interfaces/file-storage.interface";
import { UpdateUserAvatarCommand } from "../models/update-user.command";

export class UpdateUsers {
    constructor(
        private userRepository: UserRepository,
        private fileStorage: FileStorage,
        private generator: Generator
    ) {}

    async updateAvatar(command: UpdateUserAvatarCommand): Promise<string|null> {
        const user = await this.userRepository.findById(command.userId);
        if (!user) return null;

        const id = `${this.generator.generateInt(10000000, 99999999)}`
        const avatarUrl = await this.fileStorage.storeFile(command.file, id);

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
