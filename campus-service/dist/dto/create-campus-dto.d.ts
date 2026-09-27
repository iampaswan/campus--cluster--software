import { CampusType, CampusVisibility } from '../entities/campus.entity';
export declare class CreateCampusDto {
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
