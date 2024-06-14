import express, { Router } from 'express';
import { CurrentUser } from '../controllers/current-user';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { TokenController } from '../controllers/refresh-token';
import { AuthService } from '../services/auth.service';
import { UserMiddleware } from '@globals/helpers/user-middlewares';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    const currentUserController = new CurrentUser();
    const authService = new AuthService();
    const tokenController = new TokenController(authService);
    
    this.router.get('/currentuser', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, currentUserController.read);
    this.router.post('/refresh-token/:username', AuthMiddleware.validateJWT, tokenController.refreshToken);
    this.router.post('/resend-email', AuthMiddleware.validateJWT, tokenController.refreshToken);


    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
