import { Module } from "@nestjs/common";
import { Generator } from "../../core/interfaces/generator.interface";
import { IdGenerator } from "../../infrastructure/generator/id.generator";
import { FileStorage } from "../../core/interfaces/file-storage.interface";
import { LocalStorage } from "../../infrastructure/storage/local-storage/local-storage";
import { SecurityModule } from "../../infrastructure/security/security.module";

@Module({
	imports: [
		SecurityModule
	],
	providers: [
		{
			provide: Generator,
			useClass: IdGenerator,
		},
		{
			provide: FileStorage,
			useClass: LocalStorage,
		}
	],
	exports: [Generator, FileStorage, SecurityModule],
})
export class SharedModule {}