import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: process.env.ORIGIN || 'http://localhost:3000', // Allow only this origin to access
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify HTTP methods allowed
      allowedHeaders: 'Content-Type, Accept, Authorization', // Specify headers allowed
    },
  });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
