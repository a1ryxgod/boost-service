import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './config/app.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // CORS configuration
  app.enableCors({
    origin: appConfig.cors.origin,
    credentials: appConfig.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Security headers (helmet alternative using native headers)
  app.use((req: any, res: any, next: any) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Boost Service API')
    .setDescription('Production-ready API for game boosting marketplace')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Profile', 'User profile management')
    .addTag('Orders', 'Order management')
    .addTag('Games', 'Games catalog')
    .addTag('Services', 'Boosting services')
    .addTag('Payments', 'Payment processing')
    .addTag('Reviews', 'Reviews and ratings')
    .addTag('Admin', 'Administrative operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: false,
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = appConfig.port;
  await app.listen(port);

  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Boost Service API                   ║
╠═══════════════════════════════════════════╣
║   Server:  http://localhost:${port}        ║
║   Docs:    http://localhost:${port}/docs   ║
║   Env:     ${appConfig.env.padEnd(25)}║
╚═══════════════════════════════════════════╝
  `);
}

bootstrap();