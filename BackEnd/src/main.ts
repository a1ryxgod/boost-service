import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Boost Service API')
    .setDescription('API documentation for Boost Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Используй 'docs' вместо 'api/docs', т.к. globalPrefix уже добавляет 'api'
  // Или явно отключи useGlobalPrefix для Swagger
  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: false,
  });

  const port = Number(process.env.PORT ?? 4001);
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/docs`);
}

bootstrap();