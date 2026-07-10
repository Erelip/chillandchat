import { Module } from "@nestjs/common";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { CreateUsers } from "../../core/usecases/create-user";
import { GetUsers } from "../../core/usecases/get-users";
import { UserController } from "./user.controller";
import { SharedModule } from "../modules/shared.module";
import { PersistenceModule } from "../modules/persistence.module";
import { Generator } from "../../core/interfaces/generator.interface";
import { UpdateUsers } from "../../core/usecases/update-user";
import { FileStorage } from "../../core/interfaces/file-storage.interface";
import { PasswordHasher } from "../../core/interfaces/password-hasher.interface";

@Module({
	imports: [SharedModule, PersistenceModule],
	providers: [
		{
			provide: GetUsers,
			useFactory: (userRepository: UserRepository) => {
				return new GetUsers(userRepository);
			},
			inject: [UserRepository],
		},
		{
			provide: CreateUsers,
			useFactory: (
				userRepository: UserRepository,
				passwordHasher: PasswordHasher,
				generator: Generator,
			) => {
				return new CreateUsers(userRepository, passwordHasher, generator);
			},
			inject: [UserRepository, PasswordHasher, Generator],
		},
		{
			provide: UpdateUsers,
			useFactory: (
				userRepository: UserRepository,
				fileStorage: FileStorage,
				generator: Generator
			) => {
				return new UpdateUsers(userRepository, fileStorage, generator);
			},
			inject: [UserRepository, FileStorage, Generator]
		}
	],
	exports: [GetUsers, CreateUsers, UpdateUsers],
	controllers: [UserController],
})
export class UsersModule {}