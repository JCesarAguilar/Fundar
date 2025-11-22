import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from 'src/email/email.service';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        statusCode: 200,
        message: 'Login successful',
        result: {
          access_token: 'jwt_token',
          user: {
            id: 'user-uuid',
            email: 'juan.perez@email.com',
            role: 'user',
            firstName: 'Juan',
            lastName: 'Pérez',
            imageUrl: 'https://img.com/photo.jpg',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() credentials: LoginUserDto) {
    try {
      const { email, password } = credentials;
      const result = await this.authService.signIn(email, password);
      return result;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof InternalServerErrorException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
    }
  }

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      example: {
        statusCode: 201,
        message: 'User successfully registered',
        user: {
          id: 'user-uuid',
          email: 'juan.perez@email.com',
          role: 'user',
          firstName: 'Juan',
          lastName: 'Pérez',
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Email is already registered' })
  async signUp(@Body() createUser: CreateUserDto) {
    try {
      const user = await this.authService.signUp(createUser);

      await this.emailService.sendMail(
        user.user.email,
        'Welcome to Fundar.',
        `Hello ${user.user.firstName} ${user.user.lastName}, thank you for registering!`
      );

      return user;
    } catch (error) {
      if (
        error instanceof InternalServerErrorException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
    }
  }

  @Get('google')
  @ApiOperation({ summary: 'Initiate Google OAuth login (redirects to Google)' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google OAuth login page',
  })
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
     try {
     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error with Google OAuth');
    }
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Google OAuth callback (redirects to frontend)' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to frontend with JWT and user info in query params',
  })
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const profile = req.user;
      const email = profile.emails[0].value;
      const displayName = profile.displayName;
      const [firstName, ...lastNameParts] = displayName.split(' ');
      const lastName = lastNameParts.join(' ');
  
      const user = await this.authService.findOrCreateGoogleUser(email, firstName, lastName);
  
      const token = await this.authService.generateJwtToken(user);
  
      return res.redirect(
        `http://localhost:3000/google-success?token=${token}&email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&role=${encodeURIComponent(user.role ?? 'user')}`
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error in Google OAuth callback');
    }
  }
}