
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CampusType {
  SCHOOL = 'SCHOOL',
  COLLEGE = 'COLLEGE',
  UNIVERSITY = 'UNIVERSITY',
  INSTITUTE = 'INSTITUTE',
  BOOTCAMP = 'BOOTCAMP',
  COMPANY = 'COMPANY',
  TRAINING_CENTER = 'TRAINING_CENTER',
  COMMUNITY = 'COMMUNITY',
  ONLINE_ACADEMY = 'ONLINE_ACADEMY',
  OTHER = 'OTHER',
}

export enum CampusVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  INVITE_ONLY = 'INVITE_ONLY',
}

export enum CampusStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
}

@Entity('campuses')
export class Campus {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 180 })
  slug!: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logoUrl?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  bannerUrl?: string;

  @Column({
    type: 'enum',
    enum: CampusType,
    default: CampusType.OTHER,
  })
  type!: CampusType;

  @Column({
    type: 'enum',
    enum: CampusVisibility,
    default: CampusVisibility.PUBLIC,
  })
  visibility!: CampusVisibility;

  @Column({
    type: 'enum',
    enum: CampusStatus,
    default: CampusStatus.ACTIVE,
  })
  status!: CampusStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone?: string;

  /**
   * Global User ID from user-service/auth-service.
   *
   * We intentionally do not create a TypeORM relation here
   * because User belongs to another microservice/database domain.
   */
  @Index()
  @Column({ type: 'uuid' })
  ownerId!: string;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
