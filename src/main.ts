import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaException } from './exceptions-filters/prisma.exception';
import { ValidationPipe } from '@nestjs/common';
import { InvalidRelationExceptionFilter } from './exceptions-filters/invalid-relation.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('Nestjs 10 - Movie API')
    .setDescription('The movie API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
