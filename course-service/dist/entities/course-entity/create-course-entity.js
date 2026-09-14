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
exports.Course = exports.CourseLevel = exports.CourseStatus = exports.CourseVisibility = void 0;
const typeorm_1 = require("typeorm");
var CourseVisibility;
(function (CourseVisibility) {
    CourseVisibility["PUBLIC"] = "public";
    CourseVisibility["PRIVATE"] = "private";
})(CourseVisibility || (exports.CourseVisibility = CourseVisibility = {}));
var CourseStatus;
(function (CourseStatus) {
    CourseStatus["DRAFT"] = "draft";
    CourseStatus["PUBLISHED"] = "published";
    CourseStatus["ARCHIVED"] = "archived";
})(CourseStatus || (exports.CourseStatus = CourseStatus = {}));
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["BEGINNER"] = "beginner";
    CourseLevel["INTERMEDIATE"] = "intermediate";
    CourseLevel["ADVANCED"] = "advanced";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Course.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "banner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], Course.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "campusId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: CourseVisibility,
        default: CourseVisibility.PUBLIC,
    }),
    __metadata("design:type", String)
], Course.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: CourseStatus,
        default: CourseStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: CourseLevel,
        default: CourseLevel.BEGINNER,
    }),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, default: "English" }),
    __metadata("design:type", String)
], Course.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "certificate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamptz",
    }),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamptz",
    }),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)("courses"),
    (0, typeorm_1.Index)(["slug"], { unique: true }),
    (0, typeorm_1.Index)(["createdBy"]),
    (0, typeorm_1.Index)(["campusId"]),
    (0, typeorm_1.Index)(["categoryId"]),
    (0, typeorm_1.Index)(["status"])
], Course);
