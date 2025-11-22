import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers() {
      try {
      return await this.usersRepository.getUsers();
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching users');
    }
  }

  async getUserById(id: string): Promise<User | null> {
     try {
      return await this.usersRepository.getUserById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching user');
    }
  }

  async update(id: string, updateUser: CreateUserDto) {
    try {
          return await this.usersRepository.update(id, updateUser);
        } catch (error) {
          throw new InternalServerErrorException(error.message || 'Error updating user');
        }  
    }

  async updateRole(id: string, role: 'admin' | 'user'): Promise<User> {
   try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new NotFoundException('User not found');
      user.role = role;
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error updating user role');
    }
  }
  
  async remove(id: string) {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error deleting user');
    }  }
}
