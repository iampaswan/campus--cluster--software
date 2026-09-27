import { Campus } from "../entities/campus.entity.js";
import { CreateCampusDto } from "../dto/create-campus-dto.js";
import { UpdateCampusDto } from "../dto/update-campus-dto.js";
export declare const createCampus: (ownerId: string, createCampusDto: CreateCampusDto) => Promise<Campus>;
export declare const getCampuses: (page?: number, limit?: number, search?: string) => Promise<{
    data: Campus[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getCampusById: (id: string) => Promise<Campus>;
export declare const getCampusBySlug: (slug: string) => Promise<Campus>;
export declare const getMyCampuses: (ownerId: string) => Promise<Campus[]>;
export declare const updateCampus: (id: string, ownerId: string, updateCampusDto: UpdateCampusDto) => Promise<Campus>;
export declare const deleteCampus: (id: string, ownerId: string) => Promise<{
    message: string;
}>;
