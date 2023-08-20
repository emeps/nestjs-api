import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaException} from './exceptions-filters/prisma.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaException());
  await app.listen(3000);
}
bootstrap();
