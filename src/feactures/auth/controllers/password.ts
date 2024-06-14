import { Request, Response } from 'express';
import { PasswordService } from '../services/password.service';
import { CustomError } from '@globals/helpers/custom.error';
import { StatusCodes } from 'http-status-codes';

export class Password {
  constructor(
    private readonly passwordService: PasswordService,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };


  public async create(req: Request, res: Response): Promise<void> {
    res.send(' Password create');
  }


  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { newPassword } = req.body;
      const userId = req.body.user.id;
      if (!userId || !newPassword) {
        throw CustomError.badRequest('Missing userId or newPassword');
      }

      await this.passwordService.updatePassword(userId, newPassword);
      res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
