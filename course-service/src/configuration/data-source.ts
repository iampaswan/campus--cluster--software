import { DataSource } from 'typeorm';

import { Course } from '../entities/course-entity/create-course-entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',   // Your PostgreSQL password
  database: 'campuscluster',

  entities: [
    Course,
  ],

  synchronize: true,
});