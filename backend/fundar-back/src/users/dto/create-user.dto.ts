import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan', description: 'First name of the user' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Pérez', description: 'Last name of the user' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'juan.perez@email.com', description: 'Email address of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password (min 6 characters)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Calle Falsa 123', required: false, description: 'Address of the user' })
  address?: string;

  @ApiProperty({ example: '+54 911 1234 5678', required: false, description: 'Phone number' })
  phone?: string;

  @ApiProperty({ example: 'Argentina', required: false, description: 'Country of residence' })
  country?: string;

  @ApiProperty({ example: 'Buenos Aires', required: false, description: 'City of residence' })
  city?: string;

  @ApiProperty({ example: '1990-05-20', required: false, description: 'Birth date (YYYY-MM-DD)' })
  birthDate?: Date;

  @ApiProperty({ example: 'user', required: false, description: 'Role of the user (admin or user)' })
  role?: 'admin' | 'user';
}