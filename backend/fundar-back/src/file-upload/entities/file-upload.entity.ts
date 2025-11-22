import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FileUpload {
  @ApiProperty({ example: 'f1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'Unique identifier for the file upload (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'https://cloudinary.com/image.jpg', description: 'URL of the uploaded file' })
  @Column()
  url: string;

  @ApiProperty({ example: 'photo', description: 'Type of the uploaded file', enum: ['photo', 'video', 'document'] })
  @Column()
  type: 'photo' | 'video' | 'document';

  @ApiProperty({ type: () => Project, required: false, description: 'Associated project (if any)' })
  @ManyToOne(() => Project, project => project.id, { nullable: true })
  project?: Project;

  @ApiProperty({ type: () => User, required: false, description: 'Associated user (if any)' })
  @ManyToOne(() => User, user => user.id, { nullable: true })
  user?: User;
}