import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { imageService } from '../services/image.service';
import { DeleteImageDto } from '../dto/images.dto';

export class DeleteController {
  constructor() {
    this.deleteImage = this.deleteImage.bind(this);
    this.deleteBackgroundImage = this.deleteBackgroundImage.bind(this);
  }

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

  public async deleteBackgroundImage(req: Request, res: Response): Promise<void> {
    const deleteImageDto = plainToClass(DeleteImageDto, req.params);
    const errors = await validate(deleteImageDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    await imageService.removeImageFromDB(deleteImageDto.imageId);

    res.status(HTTP_STATUS.OK).json({ message: 'Background image deleted successfully' });
  }
}
