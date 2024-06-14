/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError } from '@globals/helpers/custom.error';
import { Request, Response } from 'express';



export class UserUpdateController {
  constructor(
    private readonly userUpdateService: any,
    private readonly imageUploadService: any

  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  public async updateUserInfo(req: Request, res: Response): Promise<void> {
    res.send('updateUserInfo');

  }

  public async updateUserImages(req: Request, res: Response): Promise<void> {
    res.send('updateUserImages');
  }
}
