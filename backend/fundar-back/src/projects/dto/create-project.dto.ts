import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Clean Water Initiative', description: 'Project title' })
  title: string;

  @ApiProperty({ example: 'Providing clean water to rural areas.', description: 'Short summary of the project' })
  resume: string;

  @ApiProperty({ example: 'This project aims to build wells...', description: 'Detailed description of the project' })
  description: string;

  @ApiProperty({ example: 'Argentina', description: 'Country where the project is implemented' })
  country: string;

  @ApiProperty({ example: 10000, description: 'Goal amount for the project (USD)' })
  goalAmount: number;

  @ApiProperty({ example: ['https://img.com/1.jpg'], description: 'Array of image URLs for the project', required: false })
  imageUrls?: string[];

  @ApiProperty({ example: 'category-uuid', description: 'Category ID (UUID)', required: false })
  categoryId?: string;
}
