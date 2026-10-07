import { User } from "../entities/users.entity";
import { UserRepository } from "../interfaces/user.repository.interface";
import { Generator } from "../interfaces/generator.interface";
import { CreateUserCommand } from "../models/create-user.command";
import { PasswordHasher } from "../interfaces/password-hasher.interface";
import { UnauthorizedException } from "../exceptions";

export class CreateUsers {

	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
		private generator: Generator
	) {}

	async createUser(command: CreateUserCommand) : Promise<User> {
		const user = await this.userRepository.findByEmail(command.email);
		if (user) throw new UnauthorizedException("Already exists");

		const createdUser = new User(
			this.generator.generateUUID(),
			command.username,
			command.email,
			command.password ? await this.passwordHasher.hash(command.password) : null,
			command.firstname,
			command.lastname,
			command.phoneNumber,
			null,
			command.provider
		)

		const domain = await this.userRepository.save(createdUser);
		return domain;
	}
}
