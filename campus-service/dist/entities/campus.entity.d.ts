export declare enum CampusType {
    SCHOOL = "SCHOOL",
    COLLEGE = "COLLEGE",
    UNIVERSITY = "UNIVERSITY",
    INSTITUTE = "INSTITUTE",
    BOOTCAMP = "BOOTCAMP",
    COMPANY = "COMPANY",
    TRAINING_CENTER = "TRAINING_CENTER",
    COMMUNITY = "COMMUNITY",
    ONLINE_ACADEMY = "ONLINE_ACADEMY",
    OTHER = "OTHER"
}
export declare enum CampusVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    INVITE_ONLY = "INVITE_ONLY"
}
export declare enum CampusStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    ARCHIVED = "ARCHIVED"
}
export declare class Campus {
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
    /**
     * Global User ID from user-service/auth-service.
     *
     * We intentionally do not create a TypeORM relation here
     * because User belongs to another microservice/database domain.
     */
    ownerId: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
