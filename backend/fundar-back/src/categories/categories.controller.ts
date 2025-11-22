import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBody({
    description: 'Create a new category',
    type: CreateCategoryDto,
    examples: {
      example1: {
        summary: 'Basic category creation',
        value: {
          name: 'Health'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Category created successfully', type: Category })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.createCategory(createCategoryDto);    
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating category');
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all categories', type: [Category] })
  async getCategories() {
    try {
      return await this.categoriesService.getCategories();    
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching categories');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Get category by ID', type: Category })
  async GetCategoryById(@Param('id') id: string) {
    try {
      return await this.categoriesService.GetCategoryById(id);     
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error fetching category');
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated successfully', type: Category })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoriesService.updateCategory(id, updateCategoryDto);      
    } catch (error) {
       if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error updating category');
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.categoriesService.deleteCategory(id);    
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting category');
    }
  }
}