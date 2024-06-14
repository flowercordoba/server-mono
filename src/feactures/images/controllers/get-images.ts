import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IFileImageDocument } from '../interfaces/image.interface';
import { imageService } from '../services/image.service';

export class GetController {
  constructor() {
    this.images = this.images.bind(this);
  }

  public async images(req: Request, res: Response): Promise<void> {
    try {
      console.log('Fetching images for user:', req.params.userId); // Log para depuración
      const images: IFileImageDocument[] = await imageService.getUserWithImages(req.params.userId);
      console.log('Images fetched:', images); // Log para depuración
      res.status(HTTP_STATUS.OK).json({ message: 'User images', images });
    } catch (error) {
      console.error('Error fetching images:', error); // Log para depuración
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving images', error });
    }
  }
}
