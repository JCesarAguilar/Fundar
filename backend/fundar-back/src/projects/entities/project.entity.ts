import { Category } from 'src/categories/entities/category.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @ApiProperty({ example: 'a183a4f5-2b36-43b6-a2b4-a46bb0c38844', description: 'Project unique identifier (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Clean Water Initiative', description: 'Project title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Providing clean water to rural areas.', description: 'Short summary of the project' })
  @Column({  length: 180 })
  resume: string;

  @ApiProperty({ example: 'This project aims to build wells...', description: 'Detailed description of the project' })
  @Column({ length: 600 })
  description: string;

  @ApiProperty({ example: 'Argentina', description: 'Country where the project is implemented' })
  @Column()
  country: string;

  @ApiProperty({ example: 10000, description: 'Goal amount for the project (USD)' })
  @Column({ type: 'float', default: 0 })
  goalAmount: number;

  @ApiProperty({ example: 5000, description: 'Current amount raised (USD)' })
  @Column({nullable: true, type: 'float', default: 0 })
  currentAmount: number;

  @ApiProperty({ example: ['https://img.com/1.jpg'], description: 'Array of image URLs for the project' })
  @Column('text', { array: true, default: [] })
  imageUrls: string[];

  @ApiProperty({ example: 'active', description: 'Project status (active, inactive, completed)' })
  @Column({nullable: true, default: 'active' })
  status: 'active' | 'inactive' | 'completed';

  @ApiProperty({ example: '2025-11-05T00:47:49.894Z', description: 'Creation date of the project' })
  @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ example: 'category-uuid', description: 'Category ID (UUID)', required: false })
  @Column({ name: 'category_id', nullable: true  })
  categoryId?: string;

  @ApiProperty({ type: () => [Donation], required: false })
  @OneToMany(() => Donation, (donation) => donation.project)
  donations: Donation[];

  @ApiProperty({ type: () => Category, required: false })
  @ManyToOne(() => Category, (category) => category.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
