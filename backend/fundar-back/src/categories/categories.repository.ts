import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const existing = await this.categoriesRepository.findOne({
        where: { name: createCategoryDto.name },
      });
      if (existing) {
        throw new ConflictException(
          `There is already a category with the name ${createCategoryDto.name}`,
        );
      }
      const category = this.categoriesRepository.create(createCategoryDto);
      return await this.categoriesRepository.save(category);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating category: ${error.message}`,
      );
    }
  }

  async getCategories() {
    try {
      return this.categoriesRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving categories: ${error.message}`,
      );
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} was not found`);
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error searching for category: ${error.message}`,
      );
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} was not found`);
      }

      await this.categoriesRepository.update(id, updateCategoryDto);
      return await this.categoriesRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating category: ${error.message}`,
      );
    }
  }

  async deleteCategory(id: string) {
    try {
      const result = await this.categoriesRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Category with ID ${id} was not found`);
      }
      return { message: `Category with ID ${id} successfully deleted.` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting the category: ${error.message}`,
      );
    }
  }
}
