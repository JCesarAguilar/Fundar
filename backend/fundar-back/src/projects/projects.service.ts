import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectsRepository) {}

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      return await this.projectsRepository.createProject(createProjectDto);  
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating project');
    }
  }

  async getProjects() {
    try {
      return await this.projectsRepository.getProjects();
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching projects');
    }
  }

  async getProjectById(id: string) {
    try {
      return await this.projectsRepository.getProjectById(id);      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching project');
    }
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.projectsRepository.updateProject(id, updateProjectDto);      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error updating project');
    }
  }
  
  async filterByCategory(categoryId: string) {
    try {
      return await this.projectsRepository.filterProjectsByCategory(categoryId);      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error filtering projects');
    }
  }

  async removeProject(id: string) {
    try {
      return await this.projectsRepository.deleteProject(id);     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error deleting project');
    }
  }
}
