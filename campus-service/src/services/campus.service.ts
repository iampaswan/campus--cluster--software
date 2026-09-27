import {
  Campus,
  CampusStatus,
  CampusVisibility,
} from "../entities/campus.entity.js";

import {
  CreateCampusDto,
} from "../dto/create-campus-dto.js";

import {
  UpdateCampusDto,
} from "../dto/update-campus-dto.js";


import { AppDataSource } from "../configuration/data-source.js";

const campusRepository =
  AppDataSource.getRepository(Campus);


// --------------------------------------------------
// Create Campus
// --------------------------------------------------

export const createCampus = async (
  ownerId: string,
  createCampusDto: CreateCampusDto
): Promise<Campus> => {

  const slug = await generateUniqueSlug(
    createCampusDto.name
  );

  const campus = campusRepository.create({
    ...createCampusDto,

    slug,

    ownerId,

    visibility:
      createCampusDto.visibility ??
      CampusVisibility.PUBLIC,

    status: CampusStatus.ACTIVE,

    isVerified: false,
  });

  try {

    return await campusRepository.save(campus);

  } catch (error: any) {

    console.error(
      "Create campus database error:",
      error
    );

    if (error?.code === "23505") {
      throw new Error(
        "Campus with this name or slug already exists"
      );
    }

    throw new Error(
      "Failed to create campus"
    );
  }
};


// --------------------------------------------------
// Get Public Campuses
// --------------------------------------------------

export const getCampuses = async (
  page = 1,
  limit = 20,
  search?: string
) => {

  const safePage = Math.max(1, page);

  const safeLimit = Math.min(
    Math.max(1, limit),
    100
  );

  const skip =
    (safePage - 1) * safeLimit;


  const query =
    campusRepository
      .createQueryBuilder("campus")

      .where(
        "campus.status = :status",
        {
          status: CampusStatus.ACTIVE,
        }
      )

      .andWhere(
        "campus.visibility = :visibility",
        {
          visibility:
            CampusVisibility.PUBLIC,
        }
      );


  // Search
  if (search?.trim()) {

    query.andWhere(
      `
      (
        campus.name ILIKE :search
        OR campus.description ILIKE :search
        OR campus.city ILIKE :search
        OR campus.state ILIKE :search
      )
      `,
      {
        search: `%${search.trim()}%`,
      }
    );
  }


  query
    .orderBy(
      "campus.createdAt",
      "DESC"
    )
    .skip(skip)
    .take(safeLimit);


  const [data, total] =
    await query.getManyAndCount();


  return {
    data,

    meta: {
      page: safePage,
      limit: safeLimit,
      total,

      totalPages:
        Math.ceil(
          total / safeLimit
        ),
    },
  };
};


// --------------------------------------------------
// Get Campus By ID
// --------------------------------------------------

export const getCampusById = async (
  id: string
): Promise<Campus> => {

  const campus =
    await campusRepository.findOne({
      where: {
        id,
      },
    });


  if (!campus) {
    throw new Error(
      "Campus not found"
    );
  }


  return campus;
};


// --------------------------------------------------
// Get Campus By Slug
// --------------------------------------------------

export const getCampusBySlug = async (
  slug: string
): Promise<Campus> => {

  const campus =
    await campusRepository.findOne({
      where: {
        slug,
        status: CampusStatus.ACTIVE,
      },
    });


  if (!campus) {
    throw new Error(
      "Campus not found"
    );
  }


  return campus;
};


// --------------------------------------------------
// Get My Campuses
// --------------------------------------------------

export const getMyCampuses = async (
  ownerId: string
): Promise<Campus[]> => {

  return campusRepository.find({

    where: {
      ownerId,
    },

    order: {
      createdAt: "DESC",
    },

  });
};


// --------------------------------------------------
// Update Campus
// --------------------------------------------------

export const updateCampus = async (
  id: string,
  ownerId: string,
  updateCampusDto: UpdateCampusDto
): Promise<Campus> => {

  const campus =
    await getCampusById(id);


  // Check owner
  checkOwnership(
    campus,
    ownerId
  );


  // If name changes,
  // regenerate slug.
  if (
    updateCampusDto.name &&
    updateCampusDto.name !== campus.name
  ) {

    campus.name =
      updateCampusDto.name;

    campus.slug =
      await generateUniqueSlug(
        updateCampusDto.name,
        campus.id
      );
  }


  // Update remaining fields
  Object.assign(
    campus,
    {
      ...updateCampusDto,

      // Don't allow these fields
      // to be changed through DTO.
      ownerId: campus.ownerId,
      id: campus.id,
    }
  );


  return campusRepository.save(
    campus
  );
};


// --------------------------------------------------
// Delete / Archive Campus
// --------------------------------------------------

export const deleteCampus = async (
  id: string,
  ownerId: string
): Promise<{
  message: string;
}> => {

  const campus =
    await getCampusById(id);


  checkOwnership(
    campus,
    ownerId
  );


  campus.status =
    CampusStatus.ARCHIVED;


  await campusRepository.save(
    campus
  );


  return {
    message:
      "Campus archived successfully",
  };
};


// --------------------------------------------------
// Generate Unique Slug
// --------------------------------------------------

const generateUniqueSlug = async (
  name: string,
  excludeCampusId?: string
): Promise<string> => {

  const baseSlug =
    slugify(name);


  let slug = baseSlug;

  let counter = 1;


  while (true) {

    const query =
      campusRepository
        .createQueryBuilder("campus")
        .where(
          "campus.slug = :slug",
          {
            slug,
          }
        );


    if (excludeCampusId) {

      query.andWhere(
        "campus.id != :excludeCampusId",
        {
          excludeCampusId,
        }
      );
    }


    const existing =
      await query.getOne();


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

const slugify = (
  value: string
): string => {

  return value

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )

    .replace(
      /\s+/g,
      "-"
    )

    .replace(
      /-+/g,
      "-"
    );
};


// --------------------------------------------------
// Ownership
// --------------------------------------------------

const checkOwnership = (
  campus: Campus,
  ownerId: string
): void => {

  if (
    campus.ownerId !== ownerId
  ) {

    throw new Error(
      "You do not have permission to modify this campus"
    );
  }
};