import { Request, Response } from 'express';
import { CurrentUserService } from '../services/current-user.service';
import { CustomError } from '@globals/helpers/custom.error';
import { StatusCodes } from 'http-status-codes';

export class CurrentUser {
  constructor(public readonly currentUserService: CurrentUserService) {}

  private handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  public read = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentUser = req.body.user;
      if (!currentUser || !currentUser.id) {
        throw CustomError.unauthorized('User not authenticated');
      }

      const user = await this.currentUserService.getCurrentUserById(currentUser.id);
      if (user) {
        res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentUser = req.body.user;
      if (!currentUser || !currentUser.id) {
        throw CustomError.unauthorized('User not authenticated');
      }

      const user = await this.currentUserService.getCurrentUserById(currentUser.id);
      if (user) {
        res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    res.send('refreshToken');
    // try {
    //   const { name } = req.body;
    //   if (!name) {
    //     throw CustomError.badRequest('Missing name');
    //   }

    //   const { token, user } = await this.currentUserService.refreshToken(name);
    //   res.status(StatusCodes.OK).json({ token, user });
    // } catch (error) {
    //   this.handleError(error, res);
    // }
  };
}
