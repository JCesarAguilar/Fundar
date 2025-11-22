import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 async uploadImage(file: Express.Multer.File, uuid: string) {
  try {
    
  const projectExists = await this.projectRepository.findOneBy({ id: uuid });
  const userExists = await this.userRepository.findOneBy({ id: uuid });

  if (!projectExists && !userExists) {
    throw new NotFoundException('Usuario/Proyecto inexistente !');
  }

  const uploadedImage = await this.fileUploadRepository.uploadImage(file);
  const imageUrl = uploadedImage.secure_url;

  if (projectExists) {
    const updatedImages = [...(projectExists.imageUrls || []), imageUrl];
    await this.projectRepository.update(uuid, { imageUrls: updatedImages });
    const updatedProject = await this.projectRepository.findOneBy({ id: uuid });

    return {
      statusCode: 201,
      message: 'Imagen agregada exitosamente',
      type: 'project',
      imageUrl,
      project: updatedProject,
    };
  }

  if (userExists) {
    await this.userRepository.update(uuid, { imageUrl });
    const updatedUser = await this.userRepository.findOneBy({ id: uuid });

    return {
      statusCode: 201,
      message: 'Imagen agregada exitosamente',
      type: 'user',
      imageUrl,
      user: updatedUser,
    };
  }
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error uploading image');
  }
}

async uploadTempImage(file: Express.Multer.File): Promise<string> {
  try {
    const uploadedImage = await this.fileUploadRepository.saveTempImage(file);
    return uploadedImage.secure_url;
    
  } catch (error) {
    throw new InternalServerErrorException(error.message || 'Error uploading temporary image');
  }
}

}
