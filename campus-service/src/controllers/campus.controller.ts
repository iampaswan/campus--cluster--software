import { Request, Response } from "express";

import {
  createCampus,
  getCampuses,
  getCampusById,
  getCampusBySlug,
  getMyCampuses,
  updateCampus,
  deleteCampus,
} from "../services/campus.service.js";


// Create Campus
export const createCampusController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const campus = await createCampus(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Campus created successfully",
      data: campus,
    });

  } catch (error: any) {
    console.error("Create campus error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create campus",
    });
  }
};


// Get Public Campuses
export const getCampusesController = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const campuses = await getCampuses(
      page,
      limit,
      search
    );

    return res.status(200).json({
      success: true,
      message: "Campuses fetched successfully",
      data: campuses,
    });

  } catch (error: any) {
    console.error("Get campuses error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch campuses",
    });
  }
};


// Get My Campuses
export const getMyCampusesController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const campuses = await getMyCampuses(userId);

    return res.status(200).json({
      success: true,
      message: "My campuses fetched successfully",
      data: campuses,
    });

  } catch (error: any) {
    console.error("Get my campuses error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch my campuses",
    });
  }
};


// Get Campus By ID
export const getCampusByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const campus = await getCampusById(id as string);

    return res.status(200).json({
      success: true,
      message: "Campus fetched successfully",
      data: campus,
    });

  } catch (error: any) {
    console.error("Get campus by id error:", error);

    return res.status(404).json({
      success: false,
      message: error.message || "Campus not found",
    });
  }
};


// Get Campus By Slug
export const getCampusBySlugController = async (
  req: Request,
  res: Response
) => {
  try {
    const { slug } = req.params;

    const campus = await getCampusBySlug(slug as string);

    return res.status(200).json({
      success: true,
      message: "Campus fetched successfully",
      data: campus,
    });

  } catch (error: any) {
    console.error("Get campus by slug error:", error);

    return res.status(404).json({
      success: false,
      message: error.message || "Campus not found",
    });
  }
};


// Update Campus
export const updateCampusController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    const campus = await updateCampus(
      id as string,
      userId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Campus updated successfully",
      data: campus,
    });

  } catch (error: any) {
    console.error("Update campus error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update campus",
    });
  }
};


// Delete / Archive Campus
export const deleteCampusController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    const result = await deleteCampus(
      id as string,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Campus deleted successfully",
      data: result,
    });

  } catch (error: any) {
    console.error("Delete campus error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete campus",
    });
  }
};