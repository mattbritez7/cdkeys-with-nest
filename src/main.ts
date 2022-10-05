import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/index'; //importo la conf de la bd

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap(); //inicia server de nest js

AppDataSource.initialize() //inicia server de bd
  .then(() => {
    console.log('Working db pa');
  })
  .catch(() => {
    console.log('Ups fatal error');
  });
