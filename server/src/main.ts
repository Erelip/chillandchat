import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from '../environments/environment.dev';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CoreExceptionFilter } from './infrastructure/filters/core-exceptions.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({
		origin: `${environment.CORS_ORIGIN}`,
		credentials: true
	});
	app.useStaticAssets(join(process.cwd(), 'uploads'), {
		prefix: '/uploads/',
	});
	app.useGlobalFilters(new CoreExceptionFilter());
	app.use(cookieParser());
	await app.listen(3000);
}

bootstrap();
