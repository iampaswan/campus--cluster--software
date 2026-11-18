import { DataSource } from 'typeorm';

import { Course } from '../entities/course-entity/create-course-entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'campuscluster',

  entities: [
    Course,
  ],

  synchronize: true,
});
