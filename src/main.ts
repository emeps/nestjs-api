import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaException } from './exceptions-filters/prisma.exception';
import { ValidationPipe } from '@nestjs/common';
import { InvalidRelationExceptionFilter } from './exceptions-filters/invalid-relation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new PrismaException(),
    new InvalidRelationExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
