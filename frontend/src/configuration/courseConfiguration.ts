import { apiClient } from "./authConfiguration";


// ===============================
// Types
// ===============================

export type CourseVisibility = "public" | "private";

export type CourseStatus =
  | "draft"
  | "published"
  | "archived";

export type CourseLevel =
  | "beginner"
  | "intermediate"
  | "advanced";


export interface CreateCourseData {
  title: string;
  slug: string;
  description?: string;

  thumbnail?: string;
  banner?: string;

  // null = public/general course
  campusId?: string | null;

  visibility?: CourseVisibility;
  status?: CourseStatus;

  categoryId?: string | null;

  level?: CourseLevel;
  language?: string;

  price?: number;
  isPaid?: boolean;
  certificate?: boolean;
}


export interface Course {
  id: string;

  title: string;
  slug: string;
  description: string | null;

  thumbnail: string | null;
  banner: string | null;

  createdBy: string;
  campusId: string | null;

  visibility: CourseVisibility;
  status: CourseStatus;

  categoryId: string | null;

  level: CourseLevel;
  language: string;

  price: number;
  isPaid: boolean;
  certificate: boolean;

  createdAt: string;
  updatedAt: string;
}


// ===============================
// API Response Types
// ===============================

export interface CourseResponse {
  success: boolean;
  message: string;
  data: Course;
}

export interface CoursesResponse {
  success: boolean;
  message: string;
  data: Course[];
}


// ===============================
// Course APIs
// ===============================

export const createCourse = (
  data: CreateCourseData
) => {
  return apiClient.post<CourseResponse>(
    "/courses",
    data
  );
};


export const getMyCourses = () => {
  return apiClient.get<CoursesResponse>(
    "/courses/my"
  );
};