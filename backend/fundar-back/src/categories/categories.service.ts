import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesRepository.createCategory(createCategoryDto);      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating category'); 
    }
  }

  async getCategories() {
    try {
      return await this.categoriesRepository.getCategories();     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching categories');
    }
  }

  async GetCategoryById(id: string) {
    try {
      return await this.categoriesRepository.getCategoryById(id);      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching category');
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoriesRepository.updateCategory(id, updateCategoryDto);   
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error updating category');
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.categoriesRepository.deleteCategory(id); 
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error deleting category');
    }
  }
}
