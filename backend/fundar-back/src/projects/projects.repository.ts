import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsRepository {

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const newProject = this.projectsRepository.create(createProjectDto);
      return await this.projectsRepository.save(newProject);    
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating project');
    }
  }

  async getProjects() {
    try {
      return await this.projectsRepository.find();     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching projects');
    }
  }

  async getProjectById(id: string) {
    try {
      return await this.projectsRepository.findOneBy({ id });
    } catch (error) {
       if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error fetching project');
    }
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      await this.projectsRepository.update(id, updateProjectDto);
      return await this.projectsRepository.findOneBy({ id });    
    } catch (error) {
       if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error updating project');
    }
  }

  async filterProjectsByCategory(categoryId: string) {
    try {
      return await this.projectsRepository.find({
        where: { categoryId },
      });   
    } catch (error) {
        throw new InternalServerErrorException(error.message || 'Error filtering projects');
    }
  }

  async deleteProject(id: string) {
    try {
      return await this.projectsRepository.delete(id);     
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting project');
    }
  }
}
