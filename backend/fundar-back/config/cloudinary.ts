import { config as dotenvConfig } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenvConfig({ path: '.env' });
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } =
  process.env;

export const CloudinaryConfig = {
  // exporta un provider que luego se puede inyectar en servicios
  provide: 'CLOUDINARY', //se define el nombre del token de inyección que se usará en los servicios.
  useFactory: () => {
    return cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  },
};