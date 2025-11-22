import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'juan.perez@email.com',
    description: 'Email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Pass!123',
    description:
      'Password (8-15 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol: !@#$%^&*)',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
    message:
      'Password can only contain the following symbols: !@#$%^&*',
  })
  @Matches(/[!@#$%^&*]/, {
    message: 'Password must contain at least one symbol: !@#$%^&*',
  })
  password: string;
}