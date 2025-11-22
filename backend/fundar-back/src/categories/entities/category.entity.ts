import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({ example: 'c1a2b3c4-5678-90ab-cdef-1234567890ab', description: 'Unique identifier for the category (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Health', description: 'Name of the category' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ type: () => [Project], required: false, description: 'Projects belonging to this category' })
  @OneToMany(() => Project, (project) => project.category)
  projects: Project[];
}