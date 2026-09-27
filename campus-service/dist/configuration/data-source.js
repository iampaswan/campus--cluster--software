"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const campus_entity_1 = require("../entities/campus.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres', // Your PostgreSQL password
    database: 'campuscluster',
    entities: [
        campus_entity_1.Campus,
    ],
    synchronize: true,
});
