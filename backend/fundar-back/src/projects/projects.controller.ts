import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
    @ApiResponse({
    status: 200,
    description: 'List all projects',
    type: [Project],
  })
  async getProjects() {
    try {
      return await this.projectsService.getProjects();      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching projects');
    }
  }

  @Get('filter')
  @ApiQuery({ name: 'category', required: true, description: 'Category to filter projects' })
  @ApiResponse({
    status: 200,
    description: 'List projects by category',
    type: [Project],
  })
  async filterProjects(@Query('category') category: string) {
    try {
      return await this.projectsService.filterByCategory(category);   
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error filtering projects');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({
    status: 200,
    description: 'Get project by ID',
    type: Project,
  })
  async getProjectById(@Param('id') id: string) {
    try {
      return await this.projectsService.getProjectById(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error fetching project');
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Roles('admin')
   @ApiBody({
    type: CreateProjectDto,
    examples: {
      example1: {
        summary: 'Basic project creation',
        value: {
          title: 'Clean Water Initiative',
          description: 'Providing clean water to rural areas.',
          category: 'Health',
          goalAmount: 10000,
          startDate: '2025-01-01',
          endDate: '2025-06-01'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    type: Project,
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
      return await this.projectsService.createProject(createProjectDto);     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating project');

    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiBody({
    type: UpdateProjectDto,
    examples: {
      example1: {
        summary: 'Update project details',
        value: {
          title: 'Clean Water Initiative Updated',
          description: 'Updated description.',
          category: 'Health',
          goalAmount: 12000,
          startDate: '2025-01-01',
          endDate: '2025-07-01'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    type: Project,
  })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    try {
      return await this.projectsService.updateProject(id, updateProjectDto);
      
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error updating project');
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({
    status: 204,
    description: 'Project deleted successfully',
  })
  async removeProject(@Param('id') id: string) {
    try {
      return await this.projectsService.removeProject(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting project');
    }
  }
}
