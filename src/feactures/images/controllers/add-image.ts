import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { UploadApiResponse } from 'cloudinary';
import { BadRequestError } from '../../../shared/global/helpers/error-handler';
import { uploads } from '@globals/helpers/cloudinary-upload';
import { IBgUploadResponse } from '../interfaces/image.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Helpers } from '@globals/helpers/helpers';
import {  UploadImageDto } from '../dto/images.dto';
import { imageService } from '../services/image.service';

interface CustomRequest extends Request {
  userId?: string;
}

export class ImageController {
  constructor() {
    this.backgroundImage = this.backgroundImage.bind(this);
    this.backgroundUpload = this.backgroundUpload.bind(this);
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

  public async backgroundImage(req: CustomRequest, res: Response): Promise<void> {
    console.log('Received image data:', req.body.image.substring(0, 30));

    try {
      const { version, publicId }: IBgUploadResponse = await this.backgroundUpload(req.body.image);

      console.log('Version:', version, 'PublicId:', publicId);
      
      const url = `https://res.cloudinary.com/dzqpacupf/image/upload/v${version}/${publicId}`;

      await imageService.addBackgroundImageToDB(req.userId!, url, publicId, version);

      res.status(HTTP_STATUS.OK).json({ message: 'Image added successfully', version, publicId });
    } catch (error) {
      console.error('Error in backgroundImage:', error);
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
