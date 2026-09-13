import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user-entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',   // Your PostgreSQL password
  database: 'campuscluster',

  entities: [
    User,
  ],

  synchronize: true,
});