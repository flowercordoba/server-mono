import express, { Router } from 'express';
import { ImageController } from '../controllers/add-image';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { UserMiddleware } from '@globals/helpers/user-middlewares';

class ImageRoutes {
  private router: Router;
  private imageController: ImageController;

  constructor() {
    this.router = express.Router();
    this.imageController = new ImageController();
  }

  public routes(): Router {
    this.router.get('/:userId',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.getImages);
    this.router.post('/profile',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.addProfileImage);
    this.router.post('/background',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.addBackgroundImage);
    this.router.delete('/:imageId',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.deleteImage);
    this.router.delete('/background/:bgImageId',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.getBackgroundImage);

    return this.router;
  }
}

export const imageRoutes: ImageRoutes = new ImageRoutes();
