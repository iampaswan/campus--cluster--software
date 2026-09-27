"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampusController = exports.updateCampusController = exports.getCampusBySlugController = exports.getCampusByIdController = exports.getMyCampusesController = exports.getCampusesController = exports.createCampusController = void 0;
const campus_service_js_1 = require("../services/campus.service.js");
// Create Campus
const createCampusController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const campus = await (0, campus_service_js_1.createCampus)(userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Campus created successfully",
            data: campus,
        });
    }
    catch (error) {
        console.error("Create campus error:", error);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to create campus",
        });
    }
};
exports.createCampusController = createCampusController;
// Get Public Campuses
const getCampusesController = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const search = typeof req.query.search === "string"
            ? req.query.search
            : undefined;
        const campuses = await (0, campus_service_js_1.getCampuses)(page, limit, search);
        return res.status(200).json({
            success: true,
            message: "Campuses fetched successfully",
            data: campuses,
        });
    }
    catch (error) {
        console.error("Get campuses error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch campuses",
        });
    }
};
exports.getCampusesController = getCampusesController;
// Get My Campuses
const getMyCampusesController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const campuses = await (0, campus_service_js_1.getMyCampuses)(userId);
        return res.status(200).json({
            success: true,
            message: "My campuses fetched successfully",
            data: campuses,
        });
    }
    catch (error) {
        console.error("Get my campuses error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch my campuses",
        });
    }
};
exports.getMyCampusesController = getMyCampusesController;
// Get Campus By ID
const getCampusByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const campus = await (0, campus_service_js_1.getCampusById)(id);
        return res.status(200).json({
            success: true,
            message: "Campus fetched successfully",
            data: campus,
        });
    }
    catch (error) {
        console.error("Get campus by id error:", error);
        return res.status(404).json({
            success: false,
            message: error.message || "Campus not found",
        });
    }
};
exports.getCampusByIdController = getCampusByIdController;
// Get Campus By Slug
const getCampusBySlugController = async (req, res) => {
    try {
        const { slug } = req.params;
        const campus = await (0, campus_service_js_1.getCampusBySlug)(slug);
        return res.status(200).json({
            success: true,
            message: "Campus fetched successfully",
            data: campus,
        });
    }
    catch (error) {
        console.error("Get campus by slug error:", error);
        return res.status(404).json({
            success: false,
            message: error.message || "Campus not found",
        });
    }
};
exports.getCampusBySlugController = getCampusBySlugController;
// Update Campus
const updateCampusController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { id } = req.params;
        const campus = await (0, campus_service_js_1.updateCampus)(id, userId, req.body);
        return res.status(200).json({
            success: true,
            message: "Campus updated successfully",
            data: campus,
        });
    }
    catch (error) {
        console.error("Update campus error:", error);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to update campus",
        });
    }
};
exports.updateCampusController = updateCampusController;
// Delete / Archive Campus
const deleteCampusController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { id } = req.params;
        const result = await (0, campus_service_js_1.deleteCampus)(id, userId);
        return res.status(200).json({
            success: true,
            message: "Campus deleted successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Delete campus error:", error);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to delete campus",
        });
    }
};
exports.deleteCampusController = deleteCampusController;
