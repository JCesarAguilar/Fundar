import {
  Body,
  Controller,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('files')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpg, jpeg, png, webp, max 200kb)',
        },
        uuid: {
          type: 'string',
          description: 'UUID of the user or project',
          example: 'a183a4f5-2b36-43b6-a2b4-a46bb0c38844',
        },
      },
      required: ['file', 'uuid'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Imagen subida exitosamente',
        imageUrl: 'https://cloudinary.com/image.jpg',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 500 * 1024,
            message: 'El tamaño de la imagen no debe exceder los 200 kb!',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('uuid') uuid: string,
  ) {
    try {
      return this.fileUploadService.uploadImage(file, uuid);   
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error uploading image');
    }
  }

  @Post('uploadTempImage')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a temporary image file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpg, jpeg, png, webp, max 200kb)',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Temporary image uploaded successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Imagen subida exitosamente',
        imageUrl: 'https://cloudinary.com/temp-image.jpg',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadTempImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 500 * 1024,
            message: 'El tamaño de la imagen no debe exceder los 200 kb!',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const imageUrl = await this.fileUploadService.uploadTempImage(file);
      return {
        statusCode: 201,
        message: 'Imagen subida exitosamente',
        imageUrl,
      };
      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error uploading temporary image');
    }
  }
}