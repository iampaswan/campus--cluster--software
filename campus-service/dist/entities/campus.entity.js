"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campus = exports.CampusStatus = exports.CampusVisibility = exports.CampusType = void 0;
const typeorm_1 = require("typeorm");
var CampusType;
(function (CampusType) {
    CampusType["SCHOOL"] = "SCHOOL";
    CampusType["COLLEGE"] = "COLLEGE";
    CampusType["UNIVERSITY"] = "UNIVERSITY";
    CampusType["INSTITUTE"] = "INSTITUTE";
    CampusType["BOOTCAMP"] = "BOOTCAMP";
    CampusType["COMPANY"] = "COMPANY";
    CampusType["TRAINING_CENTER"] = "TRAINING_CENTER";
    CampusType["COMMUNITY"] = "COMMUNITY";
    CampusType["ONLINE_ACADEMY"] = "ONLINE_ACADEMY";
    CampusType["OTHER"] = "OTHER";
})(CampusType || (exports.CampusType = CampusType = {}));
var CampusVisibility;
(function (CampusVisibility) {
    CampusVisibility["PUBLIC"] = "PUBLIC";
    CampusVisibility["PRIVATE"] = "PRIVATE";
    CampusVisibility["INVITE_ONLY"] = "INVITE_ONLY";
})(CampusVisibility || (exports.CampusVisibility = CampusVisibility = {}));
var CampusStatus;
(function (CampusStatus) {
    CampusStatus["ACTIVE"] = "ACTIVE";
    CampusStatus["INACTIVE"] = "INACTIVE";
    CampusStatus["SUSPENDED"] = "SUSPENDED";
    CampusStatus["ARCHIVED"] = "ARCHIVED";
})(CampusStatus || (exports.CampusStatus = CampusStatus = {}));
let Campus = class Campus {
};
exports.Campus = Campus;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Campus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Campus.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 180 }),
    __metadata("design:type", String)
], Campus.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "bannerUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CampusType,
        default: CampusType.OTHER,
    }),
    __metadata("design:type", String)
], Campus.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CampusVisibility,
        default: CampusVisibility.PUBLIC,
    }),
    __metadata("design:type", String)
], Campus.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CampusStatus,
        default: CampusStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Campus.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Campus.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Campus.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Campus.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Campus.prototype, "updatedAt", void 0);
exports.Campus = Campus = __decorate([
    (0, typeorm_1.Entity)('campuses')
], Campus);
