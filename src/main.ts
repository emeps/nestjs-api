import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaException } from './exceptions-filters/prisma.exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaException());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  await app.listen(3000);
}
bootstrap();
