// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { ValidationExceptionFilter } from './filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Job Postings API')
    .setDescription('the description Job Postings of the CRUD API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new ValidationExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // app.setViewEngine('pug');
  await app.listen(3000);
}
bootstrap();
