import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

const start = async () => {

  const httpsOptions = {
    key: fs.readFileSync('./src/sertificates/server.key'),
    cert: fs.readFileSync('./src/sertificates/server.cert'),
  };
  
  const server = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const options = new DocumentBuilder()
  .setTitle('Todoist example')
  .setDescription('The todoist API description')
  .setVersion('1.0')
  .addTag('todo')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.init();


  http.createServer(server).listen(3000);
  https.createServer(httpsOptions, server).listen(3001);
};

start();

