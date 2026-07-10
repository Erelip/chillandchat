import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { Generator } from "../interfaces/generator.interface";
import { CreateUserCommand } from "../models/create-user.command";
import { PasswordHasher } from "../interfaces/password-hasher.interface";

export class CreateUsers {

	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
		private generator: Generator
	) {}

	async createUser(command: CreateUserCommand) : Promise<User | null> {
		const user = await this.userRepository.findByEmail(command.email);
		if (user) return null;

		const hashedPassword = await this.passwordHasher.hash(command.password);

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
