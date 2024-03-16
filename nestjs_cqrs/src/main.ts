import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import express from 'express';
import colors from 'colors';
import { ValidationError, useContainer } from 'class-validator';
import { AllExceptionsFilter } from './exceptions/all-exception.filter';
import {
  HttpStatus,
  INestApplication,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  //validate
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        console.log(errors);
        return new UnprocessableEntityException(errors);
      },
    }),
  );
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
      reportOnly: true, // Set to 'true' to enable report-only mode
    }),
  );
  // app.use(csurf());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  app.enableCors({
    origin: ['http://localhost:8000', 'http://localhost:5173'],
    credentials: true,
    exposedHeaders: ['Authorization'],
    allowedHeaders: ['Authorization'],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  retryToStart(app, 10);
}
bootstrap();
async function retryToStart(app: INestApplication, retryTime?: number) {
  if (!retryTime) {
    console.log(colors.red('Không thể khởi chạy máy chủ'));
    return;
  }
  try {
    await app.listen(process.env.PORT, () => {
      console.log(
        colors.green(
          `Server listening on http://localhost:${process.env.PORT}`,
        ),
      );
    });
  } catch (error) {
    setTimeout(async () => {
      await retryToStart(app, retryTime--);
    }, 1000);
  }
}
