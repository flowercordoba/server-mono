import { Request, Response } from 'express';
import { CurrentUserService } from '../services/current-user.service';
import { CustomError } from '@globals/helpers/custom.error';
import { StatusCodes } from 'http-status-codes';

export class CurrentUser {
  private currentUserService: CurrentUserService;

  constructor() {
    this.currentUserService = new CurrentUserService();
    this.read = this.read.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  private handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  public async read(req: Request, res: Response): Promise<void> {
    try {
      const currentUser = req.body.user;
      console.log('currentUser:', currentUser);
      if (!currentUser || !currentUser.id) {
        throw CustomError.unauthorized('User not authenticated');
      }

      const user = await this.currentUserService.getCurrentUserById(currentUser.id.toString());
      if (user) {
        res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log('Error in read method:', error);
      this.handleError(error, res);
    }
  }

  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const currentUser = req.body.user;
      console.log('currentUser:', currentUser);
      if (!currentUser || !currentUser.id) {
        throw CustomError.unauthorized('User not authenticated');
      }

      const user = await this.currentUserService.getCurrentUserById(currentUser.id.toString());
      if (user) {
        res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log('Error in getCurrentUser method:', error);
      this.handleError(error, res);
    }
  }
}
