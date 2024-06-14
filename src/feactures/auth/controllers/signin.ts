import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CustomError } from '@globals/helpers/custom.error';
import { LoginUserDto } from '../dtos/login-user.dto';

export class SignIn {
  constructor(
    public readonly authService: AuthService,
  ) {
    // Asegúrate de ligar el contexto de this para el método read
    this.read = this.read.bind(this);
  }

  private handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  public async read(req: Request, res: Response): Promise<Response> {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const user = await this.authService.loginUser(loginUserDto!);
      return res.json(user);
    } catch (error) {
      return this.handleError(error, res);
    }
  }
}
