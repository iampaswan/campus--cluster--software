import { Request, Response } from "express";


import { createCourse, getMyCourses } from "../services/course.service.js";

export const createCourseController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const course = await createCourse(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });

  } catch (error: any) {
    console.error("Create course error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create course",
    });
  }
};


export const getMyCoursesController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const courses = await getMyCourses(userId);

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });

  } catch (error: any) {
    console.error("Get my courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};