"use strict";
// campus/dto/update-campus.dto.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCampusDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_campus_dto_1 = require("./create-campus-dto");
class UpdateCampusDto extends (0, mapped_types_1.PartialType)(create_campus_dto_1.CreateCampusDto) {
}
exports.UpdateCampusDto = UpdateCampusDto;
