import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IFileImageDocument } from '../interfaces/image.interface';
import { imageService } from '../services/image.service';


export class Delete {
  public async image(req: Request, res: Response): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageId } = req.params;

    res.status(HTTP_STATUS.OK).json({ message: 'Image deleted successfully' });
  }

  public async backgroundImage(req: Request, res: Response): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const image: IFileImageDocument = await imageService.getImageByBackgroundId(req.params.bgImageId);
    
    res.status(HTTP_STATUS.OK).json({ message: 'Image deleted successfully' });
  }
}
