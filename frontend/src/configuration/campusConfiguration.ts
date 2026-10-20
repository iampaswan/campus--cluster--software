
import { apiClient } from "./authConfiguration";

import type {
  Campus,
  CampusListResponse,
  CreateCampusPayload,
  UpdateCampusPayload,
} from "../types/campus";



// Create campus
export const createCampus = (
  data: CreateCampusPayload
) => {
  return apiClient.post<{
    success: boolean;
    message: string;
    data: Campus;
  }>("/campuses", data);
};

// Get public campuses
export const getCampuses = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return apiClient.get<{
    success: boolean;
    message: string;
    data: CampusListResponse;
  }>("/campuses", { params });
};

// Get campuses created by the logged-in user
export const getMyCampuses = () => {
  return apiClient.get<{
    success: boolean;
    message: string;
    data: Campus[];
  }>("/campuses/my");
};

// Get campus by ID
export const getCampusById = (id: string) => {
  return apiClient.get<{
    success: boolean;
    message: string;
    data: Campus;
  }>(`/campuses/${id}`);
};

// Get campus by slug
export const getCampusBySlug = (slug: string) => {
  return apiClient.get<{
    success: boolean;
    message: string;
    data: Campus;
  }>(`/campuses/slug/${slug}`);
};

// Update campus
export const updateCampus = (
  id: string,
  data: UpdateCampusPayload
) => {
  return apiClient.patch<{
    success: boolean;
    message: string;
    data: Campus;
  }>(`/campuses/${id}`, data);
};

// Archive campus
export const deleteCampus = (id: string) => {
  return apiClient.delete<{
    success: boolean;
    message: string;
    data: { message: string };
  }>(`/campuses/${id}`);
};