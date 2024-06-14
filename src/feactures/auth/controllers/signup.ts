import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CustomError } from '@globals/helpers/custom.error';
import { RegisterUserDto } from '../dtos/register-user.dto';

export class SignUp {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    
    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const user = await this.authService.registerUser(registerDto!);
      console.log('user contrlador',user);
      return res.json(user);
    } catch (error) {
      console.log('errorerrpr',error);
      return this.handleError(error, res);
    }
  };
}
