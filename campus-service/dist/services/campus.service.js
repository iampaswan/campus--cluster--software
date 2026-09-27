"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampus = exports.updateCampus = exports.getMyCampuses = exports.getCampusBySlug = exports.getCampusById = exports.getCampuses = exports.createCampus = void 0;
const campus_entity_js_1 = require("../entities/campus.entity.js");
const data_source_js_1 = require("../configuration/data-source.js");
const campusRepository = data_source_js_1.AppDataSource.getRepository(campus_entity_js_1.Campus);
// --------------------------------------------------
// Create Campus
// --------------------------------------------------
const createCampus = async (ownerId, createCampusDto) => {
    const slug = await generateUniqueSlug(createCampusDto.name);
    const campus = campusRepository.create({
        ...createCampusDto,
        slug,
        ownerId,
        visibility: createCampusDto.visibility ??
            campus_entity_js_1.CampusVisibility.PUBLIC,
        status: campus_entity_js_1.CampusStatus.ACTIVE,
        isVerified: false,
    });
    try {
        return await campusRepository.save(campus);
    }
    catch (error) {
        console.error("Create campus database error:", error);
        if (error?.code === "23505") {
            throw new Error("Campus with this name or slug already exists");
        }
        throw new Error("Failed to create campus");
    }
};
exports.createCampus = createCampus;
// --------------------------------------------------
// Get Public Campuses
// --------------------------------------------------
const getCampuses = async (page = 1, limit = 20, search) => {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), 100);
    const skip = (safePage - 1) * safeLimit;
    const query = campusRepository
        .createQueryBuilder("campus")
        .where("campus.status = :status", {
        status: campus_entity_js_1.CampusStatus.ACTIVE,
    })
        .andWhere("campus.visibility = :visibility", {
        visibility: campus_entity_js_1.CampusVisibility.PUBLIC,
    });
    // Search
    if (search?.trim()) {
        query.andWhere(`
      (
        campus.name ILIKE :search
        OR campus.description ILIKE :search
        OR campus.city ILIKE :search
        OR campus.state ILIKE :search
      )
      `, {
            search: `%${search.trim()}%`,
        });
    }
    query
        .orderBy("campus.createdAt", "DESC")
        .skip(skip)
        .take(safeLimit);
    const [data, total] = await query.getManyAndCount();
    return {
        data,
        meta: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        },
    };
};
exports.getCampuses = getCampuses;
// --------------------------------------------------
// Get Campus By ID
// --------------------------------------------------
const getCampusById = async (id) => {
    const campus = await campusRepository.findOne({
        where: {
            id,
        },
    });
    if (!campus) {
        throw new Error("Campus not found");
    }
    return campus;
};
exports.getCampusById = getCampusById;
// --------------------------------------------------
// Get Campus By Slug
// --------------------------------------------------
const getCampusBySlug = async (slug) => {
    const campus = await campusRepository.findOne({
        where: {
            slug,
            status: campus_entity_js_1.CampusStatus.ACTIVE,
        },
    });
    if (!campus) {
        throw new Error("Campus not found");
    }
    return campus;
};
exports.getCampusBySlug = getCampusBySlug;
// --------------------------------------------------
// Get My Campuses
// --------------------------------------------------
const getMyCampuses = async (ownerId) => {
    return campusRepository.find({
        where: {
            ownerId,
        },
        order: {
            createdAt: "DESC",
        },
    });
};
exports.getMyCampuses = getMyCampuses;
// --------------------------------------------------
// Update Campus
// --------------------------------------------------
const updateCampus = async (id, ownerId, updateCampusDto) => {
    const campus = await (0, exports.getCampusById)(id);
    // Check owner
    checkOwnership(campus, ownerId);
    // If name changes,
    // regenerate slug.
    if (updateCampusDto.name &&
        updateCampusDto.name !== campus.name) {
        campus.name =
            updateCampusDto.name;
        campus.slug =
            await generateUniqueSlug(updateCampusDto.name, campus.id);
    }
    // Update remaining fields
    Object.assign(campus, {
        ...updateCampusDto,
        // Don't allow these fields
        // to be changed through DTO.
        ownerId: campus.ownerId,
        id: campus.id,
    });
    return campusRepository.save(campus);
};
exports.updateCampus = updateCampus;
// --------------------------------------------------
// Delete / Archive Campus
// --------------------------------------------------
const deleteCampus = async (id, ownerId) => {
    const campus = await (0, exports.getCampusById)(id);
    checkOwnership(campus, ownerId);
    campus.status =
        campus_entity_js_1.CampusStatus.ARCHIVED;
    await campusRepository.save(campus);
    return {
        message: "Campus archived successfully",
    };
};
exports.deleteCampus = deleteCampus;
// --------------------------------------------------
// Generate Unique Slug
// --------------------------------------------------
const generateUniqueSlug = async (name, excludeCampusId) => {
    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (true) {
        const query = campusRepository
            .createQueryBuilder("campus")
            .where("campus.slug = :slug", {
            slug,
        });
        if (excludeCampusId) {
            query.andWhere("campus.id != :excludeCampusId", {
                excludeCampusId,
            });
        }
        const existing = await query.getOne();
        if (!existing) {
            return slug;
        }
        counter++;
        slug =
            `${baseSlug}-${counter}`;
    }
};
// --------------------------------------------------
// Slugify
// --------------------------------------------------
const slugify = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};
// --------------------------------------------------
// Ownership
// --------------------------------------------------
const checkOwnership = (campus, ownerId) => {
    if (campus.ownerId !== ownerId) {
        throw new Error("You do not have permission to modify this campus");
    }
};
