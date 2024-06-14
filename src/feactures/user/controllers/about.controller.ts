/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AboutService } from '../services/about.service';
import { CustomError } from '@globals/helpers/custom.error';
import { StatusCodes } from 'http-status-codes';
import { UpdateAboutUserDto } from '../dtos/about-update.user.dto';

export class AboutController {
  private aboutService: AboutService;

  constructor() {
    this.aboutService = new AboutService();
    this.updateAboutMe = this.updateAboutMe.bind(this);
  }

  private handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  public async updateAboutMe(req: Request, res: Response): Promise<void> {
    try {
        // TODO: RECUERDA CAMBIAR ESTO
      const userId = (req as any).userId; // Casting para evitar el error de TypeScript
      if (!userId) {
        throw CustomError.unauthorized('User not authenticated');
      }

      const updateAboutUserDto: UpdateAboutUserDto = UpdateAboutUserDto.create(req.body);
      const updatedUser = await this.aboutService.updateUserAboutMe(userId, updateAboutUserDto);
      res.status(StatusCodes.OK).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.log('Error in updateAboutMe method:', error);
      this.handleError(error, res);
    }
  }
}
