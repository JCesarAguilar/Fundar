import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
  status: 200,
  description: 'List of users',
  schema: {
      example: [
        {
        id: 'b1e7e6c2-1234-4cde-8a2b-123456789abc',
        name: 'John Doe',
        email: 'john@example.com',
        city: 'New York',
        country: 'USA',
        phone: '1234567890',
        birthDate: '2000-01-01T00:00:00.000Z',
        address: '123 Main St',
        imageUrl: 'https://example.com/avatar.jpg',
        role: 'user',
        provider: null,
        donations: [],
        },
        {
        id: 'a2e7e6c2-5678-4cde-8a2b-987654321abc',
        name: 'Jane Smith',
        email: 'jane@example.com',
        city: 'Los Angeles',
        country: 'USA',
        phone: '0987654321',
        birthDate: '1995-05-15T00:00:00.000Z',
        address: '456 Elm St',
        imageUrl: 'https://example.com/avatar2.jpg',
        role: 'admin',
        provider: null,
        donations: [],
        }
      ]
    }
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  async getUsers() {
    try{
      return await this.usersService.getUsers();
    }catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching users');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  @ApiResponse({
  status: 200,
  description: 'User found',
  schema: {
    example: {
      id: 'b1e7e6c2-1234-4cde-8a2b-123456789abc',
      name: 'John Doe',
      email: 'john@example.com',
      city: 'New York',
      country: 'USA',
      phone: '1234567890',
      birthDate: '2000-01-01T00:00:00.000Z',
      address: '123 Main St',
      imageUrl: 'https://example.com/avatar.jpg',
      role: 'user',
      provider: null,
      donations: [],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      if (req.user.role !== 'admin' && req.user.id !== id) {
        throw new UnauthorizedException('You can only access your own profile');
      }
      const user = await this.usersService.getUserById(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(error.message || 'Error fetching user');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  @ApiBody({
  type: CreateUserDto,
  examples: {
    example1: {
      summary: 'Update user data',
      value: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'NewPassword123!',
        city: 'Los Angeles',
        country: 'USA',
        phone: '0987654321',
        birthDate: '1995-05-15T00:00:00.000Z',
        address: '456 Elm St',
        imageUrl: 'https://example.com/avatar2.jpg',
        role: 'admin',
        },
      },
    },
  })
  @ApiResponse({
  status: 200,
  description: 'User updated successfully',
  schema: {
    example: {
      id: 'a2e7e6c2-5678-4cde-8a2b-987654321abc',
      name: 'Jane Smith',
      email: 'jane@example.com',
      city: 'Los Angeles',
      country: 'USA',
      phone: '0987654321',
      birthDate: '1995-05-15T00:00:00.000Z',
      address: '456 Elm St',
      imageUrl: 'https://example.com/avatar2.jpg',
      role: 'admin',
      provider: null,
      donations: [],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
 async update(
  @Param('id', ParseUUIDPipe) id: string,
  @Body() updateUser: CreateUserDto,
  @Req() req,
) {
  try {
    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new UnauthorizedException('You can only update your own profile');
    }
    return await this.usersService.update(id, updateUser);
  } catch (error) {
    if (error instanceof NotFoundException || error instanceof UnauthorizedException) throw error;
    throw new InternalServerErrorException(error.message || 'Error updating user');
  }
}

  @Put(':id/role')
  @Roles('admin')
  @ApiOperation({ summary: 'Update user role by ID (admin only)' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  @ApiBody({
  schema: {
    example: {
      role: 'admin'
    },
    properties: {
      role: {
        type: 'string',
        enum: ['admin', 'user'],
        description: 'New role for the user'
        }
      }
    }
  })
  @ApiResponse({
  status: 200,
  description: 'User role updated successfully',
  schema: {
    example: {
      id: 'a2e7e6c2-5678-4cde-8a2b-987654321abc',
      name: 'Jane Smith',
      email: 'jane@example.com',
      city: 'Los Angeles',
      country: 'USA',
      phone: '0987654321',
      birthDate: '1995-05-15T00:00:00.000Z',
      address: '456 Elm St',
      imageUrl: 'https://example.com/avatar2.jpg',
      role: 'admin',
      provider: null,
      donations: [],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('role') role: 'admin' | 'user',
    ) {
      try {
        return await this.usersService.updateRole(id, role);    
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException(error.message || 'Error updating user role');
      }
    }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  @ApiResponse({
  status: 200,
  description: 'User deleted successfully',
  schema: {
    example: {
      message: 'User deleted successfully',
      user: {
        id: 'b1e7e6c2-1234-4cde-8a2b-123456789abc',
        name: 'John Doe',
        email: 'john@example.com',
        city: 'New York',
        country: 'USA',
        phone: '1234567890',
        birthDate: '2000-01-01T00:00:00.000Z',
        address: '123 Main St',
        imageUrl: 'https://example.com/avatar.jpg',
        role: 'user',
        provider: null,
        donations: [],
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {

      return await this.usersService.remove(id);  
         
    } catch (error) {

      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting user');
    }
  }
}
