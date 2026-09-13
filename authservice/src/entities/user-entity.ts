import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  password!: string | null;

  @Column({
    name: 'google_id',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
  })
  googleId!: string | null;

  @Column({
    name: 'profile_url',
    type: 'text',
    nullable: true,
  })
  profileUrl!: string | null;

  @Column({
    name: 'auth_provider',
    type: 'varchar',
    length: 20,
    default: 'local',
  })
  authProvider!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;
}