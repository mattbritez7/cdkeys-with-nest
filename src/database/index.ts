import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { keys } from './entity/keys.entity';
import { users } from './entity/users.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 3001,
  username: 'postgres',
  password: 'THEGAMERPRO7',
  database: 'cdkeys',
  entities: [keys, users],
  synchronize: true,
  logging: false,
});
