import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const { PORT = 5000, API_VERSION = 'v1' } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_VERSION);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Condo Server')
    .setDescription('API to manage the Condo App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${API_VERSION}/api-docs`, app, document);

  await app.listen(PORT);
  Logger.log(`App running on port ${PORT}`);
}
bootstrap();
