import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum CourseVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum CourseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

@Entity("courses")
@Index(["slug"], { unique: true })
@Index(["createdBy"])
@Index(["campusId"])
@Index(["categoryId"])
@Index(["status"])
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Course title
  @Column({ type: "varchar", length: 255 })
  title!: string;

  // SEO-friendly URL
  @Column({ type: "varchar", length: 255, unique: true })
  slug!: string;

  // Course description
  @Column({ type: "text", nullable: true })
  description!: string | null;

  // Course thumbnail URL
  @Column({ type: "text", nullable: true })
  thumbnail!: string | null;

  // Course banner URL
  @Column({ type: "text", nullable: true })
  banner!: string | null;

  // User who created the course
  @Column({ type: "uuid" })
  createdBy!: string;

  // NULL = public/general course
  @Column({ type: "uuid", nullable: true })
  campusId!: string | null;

  // Public / private
  @Column({
    type: "enum",
    enum: CourseVisibility,
    default: CourseVisibility.PUBLIC,
  })
  visibility!: CourseVisibility;

  // Draft / published / archived
  @Column({
    type: "enum",
    enum: CourseStatus,
    default: CourseStatus.DRAFT,
  })
  status!: CourseStatus;

  // Course category
  @Column({ type: "uuid", nullable: true })
  categoryId!: string | null;

  // Beginner / intermediate / advanced
  @Column({
    type: "enum",
    enum: CourseLevel,
    default: CourseLevel.BEGINNER,
  })
  level!: CourseLevel;

  // Example: English, Hindi, Spanish
  @Column({ type: "varchar", length: 50, default: "English" })
  language!: string;

  // Course price
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  price!: number;

  // Whether the course requires payment
  @Column({ type: "boolean", default: false })
  isPaid!: boolean;

  // Whether students receive a certificate
  @Column({ type: "boolean", default: false })
  certificate!: boolean;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt!: Date;
}