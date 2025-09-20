import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Exception Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Prevent additional values in request
      transform: true, // Automatically convert values
    }),
  );

  app.use(cookieParser()); // Used to process JWT in cookies

  app.enableCors({
    origin: 'http://localhost:3000', // your frontend
    // origin: '/', // your frontend
    credentials: true, // Allow storing JWT in cookies
  });

  app.setGlobalPrefix('api'); // add prefix /api on all endpoints

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
