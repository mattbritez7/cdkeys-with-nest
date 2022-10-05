import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { keys } from './entity/keys.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 3001,
  username: 'postgres',
  password: 'THEGAMERPRO7',
  database: 'cdkeys',
  entities: [keys],
  synchronize: true,
  logging: false,
});
