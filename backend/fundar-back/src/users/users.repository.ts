import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    try {
      return this.usersRepository.find({ relations: ['donations'] });  
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching users');
    }
  }

  async getUserById(id: string) {
    try {
      return await this.usersRepository.findOne({ 
        relations: ['donations'],
        where: { id },
      });   
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new NotFoundException('Error searching user by email');
    }
  }

  async addOne(user: Partial<User>): Promise<User> {
    try {
      const newUser = await this.usersRepository.save(user);
      return newUser;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Error adding user');
    }
  }

  async update(id: string, user: Partial<User>): Promise<Partial<User>> {
    try {
      await this.usersRepository.update(id, user);

      const updateUser = await this.usersRepository.findOneBy({ id });

      if (!updateUser) {
        throw new NotFoundException('User not found');
      }

      const { password, ...userWithoutPassword } = updateUser;

      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('Error updating user');
    }
  }
  async findById(id: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error finding user by ID');
    }  }

  async save(user: User): Promise<User> {
   try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error saving user');
    }
  }

  async delete(id: string): Promise<Partial<User>> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.usersRepository.remove(user);

      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('Error deleting user');
    }
  }
}
