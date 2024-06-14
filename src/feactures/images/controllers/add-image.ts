import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IFileImageDocument } from '../interfaces/image.interface';
import { imageService } from '../services/image.service';
import { UploadApiResponse } from 'cloudinary';
import { BadRequestError } from '../../../shared/global/helpers/error-handler';
import { uploads } from '@globals/helpers/cloudinary-upload';
import { IBgUploadResponse } from '../interfaces/image.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Helpers } from '@globals/helpers/helpers';
import { DeleteImageDto, GetImageDto, UploadImageDto } from '../dto/images.dto';

// Definimos una interfaz CustomRequest que extiende Request y añade la propiedad userId
interface CustomRequest extends Request {
  userId?: string;
}

export class ImageController {
  public async deleteImage(req: Request, res: Response): Promise<void> {
    const deleteImageDto = plainToClass(DeleteImageDto, req.params);
    const errors = await validate(deleteImageDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    await imageService.removeImageFromDB(deleteImageDto.imageId);

    res.status(HTTP_STATUS.OK).json({ message: 'Image deleted successfully' });
  }

  public async getBackgroundImage(req: Request, res: Response): Promise<void> {
    const getImageDto = plainToClass(GetImageDto, req.params);
    const errors = await validate(getImageDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const image: IFileImageDocument = await imageService.getImageByBackgroundId(getImageDto.userId);
    
    res.status(HTTP_STATUS.OK).json({ message: 'Background image retrieved successfully', image });
  }

  public async getImages(req: Request, res: Response): Promise<void> {
    const getImageDto = plainToClass(GetImageDto, req.params);
    const errors = await validate(getImageDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const images: IFileImageDocument[] = await imageService.getImages(getImageDto.userId);
    res.status(HTTP_STATUS.OK).json({ message: 'User images', images });
  }

  public async addProfileImage(req: CustomRequest, res: Response): Promise<void> {
    const uploadImageDto = plainToClass(UploadImageDto, req.body);
    const errors = await validate(uploadImageDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const result: UploadApiResponse = (await uploads(uploadImageDto.image)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }
    const url = `https://res.cloudinary.com/dzqpacupf/image/upload/v${result.version}/${result.public_id}`;

    await imageService.addUserProfileImageToDB(req.userId!, url, result.public_id, result.version.toString());

    res.status(HTTP_STATUS.OK).json({ message: 'Profile image added successfully', url });
  }

  public async addBackgroundImage(req: CustomRequest, res: Response): Promise<void> {
    const uploadImageDto = plainToClass(UploadImageDto, req.body);
    const errors = await validate(uploadImageDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    try {
      const { version, publicId }: IBgUploadResponse = await this.backgroundUpload(uploadImageDto.image);

      await imageService.addBackgroundImageToDB(req.userId!, publicId, version);

      res.status(HTTP_STATUS.OK).json({ message: 'Background image added successfully' });
    } catch (error) {
      console.error('Error in addBackgroundImage:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred' });
    }
  }

  private async backgroundUpload(image: string): Promise<IBgUploadResponse> {
    const isDataURL = Helpers.isDataURL(image);
    console.log('Is data URL:', isDataURL);

    let version = '';
    let publicId = '';

    if (isDataURL) {
      const result: UploadApiResponse = await uploads(image);
      console.log('Cloudinary upload result:', result);

      if (!result.public_id) {
        throw new BadRequestError(result.message);
      } else {
        version = result.version.toString();
        publicId = result.public_id;
      }
    } else {
      const value = image.split('/');
      version = value[value.length - 2];
      publicId = value[value.length - 1];
    }

    return { version: version.replace(/v/g, ''), publicId };
  }
}
