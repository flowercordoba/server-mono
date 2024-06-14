import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { UserMiddleware } from '@globals/helpers/user-middlewares';
import express, { Router } from 'express';
import { AboutController } from '../controllers/about.controller';


class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();


  }

  public routes(): Router {
    const aboutController = new AboutController();



    this.router.post('/aboutme', AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, aboutController.updateAboutMe);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
