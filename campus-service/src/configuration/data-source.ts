import { DataSource } from 'typeorm';


import { Campus } from '../entities/campus.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',   // Your PostgreSQL password
  database: 'campuscluster',

  entities: [
    Campus,
  ],

  synchronize: true,
});