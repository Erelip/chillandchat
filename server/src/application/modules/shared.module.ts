import { Module } from "@nestjs/common";
import { Generator } from "../../core/interfaces/generator.interface";
import { IdGenerator } from "../../infrastructure/generator/id.generator";
import { FileStorage } from "../../core/interfaces/file-storage.interface";
import { LocalStorage } from "../../infrastructure/storage/local-storage/local-storage";
import { SecurityModule } from "../../infrastructure/security/security.module";
import { IdentityProvider } from "../../core/interfaces/identity-provider.interface";
import { GoogleOAuthAdapter } from "../../infrastructure/oauth/google-oauth";
import { environment } from "../../../environments/environment.dev";

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
		},
		{
			provide: IdentityProvider,
			useFactory: () => new GoogleOAuthAdapter(environment.GOOGLE_CLIENT_ID!, environment.GOOGLE_CLIENT_SECRET!, environment.GOOGLE_CLIENT_CALLBACK_URL!)
		}
	],
	exports: [Generator, FileStorage, IdentityProvider, SecurityModule],
})
export class SharedModule {}