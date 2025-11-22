import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Health',
    description: 'Name of the category',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters.' })
  name: string;
}