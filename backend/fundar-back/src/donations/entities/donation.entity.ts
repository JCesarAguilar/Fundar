import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Donation {
  @ApiProperty({ example: 'd1a2b3c4-5678-90ab-cdef-1234567890ab', description: 'Unique identifier for the donation (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 500, description: 'Amount donated (USD)' })
  @Column()
  amount: number;

  @ApiProperty({ example: '2025-11-01T12:00:00.000Z', description: 'Date and time of the donation (ISO format)' })
  @Column()
  date: Date;

  @ApiProperty({ example: 'credit_card', description: 'Payment method used for the donation' })
  @Column()
  paymentMethod: string;

  @ApiProperty({ type: () => User, description: 'User who made the donation' })
  @ManyToOne(() => User, user => user.donations)
  user: User;

  @ApiProperty({ type: () => Project, description: 'Project that received the donation' })
  @ManyToOne(() => Project, project => project.donations)
  project: Project;
}