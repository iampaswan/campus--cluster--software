import { AppDataSource } from "../configuration/data-source.js";


import {
  Course, CourseLevel,
  CourseStatus,
  CourseVisibility
} from "../entities/course-entity/create-course-entity.js";

const courseRepository = AppDataSource.getRepository(Course);

interface CreateCourseData {
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  banner?: string;

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

export const createCourse = async (
  userId: string,
  data: CreateCourseData
) => {
  const existingCourse = await courseRepository.findOne({
    where: {
      slug: data.slug,
    },
  });

  if (existingCourse) {
    throw new Error("Course with this slug already exists");
  }

  const course = courseRepository.create({
    title: data.title,
    slug: data.slug,
    description: data.description ?? null,

    thumbnail: data.thumbnail ?? null,
    banner: data.banner ?? null,

    createdBy: userId,

    campusId: data.campusId ?? null,

    visibility:
      data.visibility ?? CourseVisibility.PUBLIC,

    status:
      data.status ?? CourseStatus.DRAFT,

    categoryId: data.categoryId ?? null,

    level:
      data.level ?? CourseLevel.BEGINNER,

    language:
      data.language ?? "English",

    price:
      data.price ?? 0,

    isPaid:
      data.isPaid ?? false,

    certificate:
      data.certificate ?? false,
  });

  return await courseRepository.save(course);
};


export const getMyCourses = async (userId: string) => {
  return await courseRepository.find({
    where: {
      createdBy: userId,
    },

    order: {
      createdAt: "DESC",
    },
  });
};