import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from '../environments/environment.dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: `${environment.CORS_ORIGIN}` });
  await app.listen(3000);
}

bootstrap();
