import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { keys } from './src/database/entity/keys.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.host,
  port: 5432,
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
  entities: [keys],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Working db pa');
  })
  .catch(() => console.log('Ups fatal error'));
