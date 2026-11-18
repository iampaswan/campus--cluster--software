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


campusRouter.post("/", createCampusController);

campusRouter.get("/my", getMyCampusesController);

campusRouter.get("/", getCampusesController);

campusRouter.get("/slug/:slug",getCampusBySlugController);

campusRouter.get( "/:id", getCampusByIdController);


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