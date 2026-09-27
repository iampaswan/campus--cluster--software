"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campus_controller_js_1 = require("../controllers/campus.controller.js");
const campusRouter = (0, express_1.Router)();
// Create campus
campusRouter.post("/", campus_controller_js_1.createCampusController);
// Get public campuses
campusRouter.get("/", campus_controller_js_1.getCampusesController);
// Get campuses created by current user
campusRouter.get("/my", campus_controller_js_1.getMyCampusesController);
// Get campus by slug
campusRouter.get("/slug/:slug", campus_controller_js_1.getCampusBySlugController);
// Get campus by ID
campusRouter.get("/:id", campus_controller_js_1.getCampusByIdController);
// Update campus
campusRouter.patch("/:id", campus_controller_js_1.updateCampusController);
// Delete campus
campusRouter.delete("/:id", campus_controller_js_1.deleteCampusController);
exports.default = campusRouter;
