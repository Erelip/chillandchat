import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from '../environments/environment.dev';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CoreExceptionFilter } from './infrastructure/filters/core-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: `${environment.CORS_ORIGIN}` });
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });
  app.useGlobalFilters(new CoreExceptionFilter());

  await app.listen(3000);
}

bootstrap();
