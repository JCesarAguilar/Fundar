import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    try{ 
    return await new Promise((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!);
          }
        },
      );
      toStream(file.buffer).pipe(upload); 
    });
  } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error uploading image');
    }
  }

 async saveTempImage(file: Express.Multer.File): Promise<{ secure_url: string }> {
  try {
    return await new Promise((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'temp', 
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({ secure_url: result!.secure_url });
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
    
  } catch (error) {
    throw new InternalServerErrorException(error.message || 'Error uploading temporary image');
  }
}

}
