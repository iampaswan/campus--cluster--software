export type CampusType =
  | "SCHOOL"
  | "COLLEGE"
  | "UNIVERSITY"
  | "INSTITUTE"
  | "BOOTCAMP"
  | "COMPANY"
  | "TRAINING_CENTER"
  | "COMMUNITY"
  | "ONLINE_ACADEMY"
  | "OTHER";

export type CampusVisibility =
  | "PUBLIC"
  | "PRIVATE"
  | "INVITE_ONLY";

export type CampusStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "ARCHIVED";

export interface Campus {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  type: CampusType;
  visibility: CampusVisibility;
  status: CampusStatus;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  ownerId: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampusPayload {
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  type: CampusType;
  visibility?: CampusVisibility;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export type UpdateCampusPayload = Partial<CreateCampusPayload>;

export interface CampusListResponse {
  data: Campus[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}