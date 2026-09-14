"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const create_course_entity_1 = require("../entities/course-entity/create-course-entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres', // Your PostgreSQL password
    database: 'campuscluster',
    entities: [
        create_course_entity_1.Course,
    ],
    synchronize: true,
});
