import { Module } from "@nestjs/common";
import { PasswordHasher } from "../../core/interfaces/password-hasher.interface";
import { BcryptPasswordHasher } from "./bcrypt-password-hasher";

@Module({
	providers: [
		{
			provide: PasswordHasher,
			useClass: BcryptPasswordHasher,
		},
	],
	exports: [PasswordHasher],
})
export class SecurityModule {}