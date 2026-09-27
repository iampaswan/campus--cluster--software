import { Router } from "express";

import {
  createCampusController,
  getCampusesController,
  getMyCampusesController,
  getCampusByIdController,
  getCampusBySlugController,
  updateCampusController,
  deleteCampusController,
} from "../controllers/campus.controller.js";

const campusRouter = Router();


// Create campus
campusRouter.post(
  "/",
  createCampusController
);


// Get public campuses
campusRouter.get(
  "/",
  getCampusesController
);


// Get campuses created by current user
campusRouter.get(
  "/my",
  getMyCampusesController
);


// Get campus by slug
campusRouter.get(
  "/slug/:slug",
  getCampusBySlugController
);


// Get campus by ID
campusRouter.get(
  "/:id",
  getCampusByIdController
);


// Update campus
campusRouter.patch(
  "/:id",
  updateCampusController
);


// Delete campus
campusRouter.delete(
  "/:id",
  deleteCampusController
);


export default campusRouter;