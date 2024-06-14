import express, { Router } from 'express';
import { ImageController } from '../controllers/add-image';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { UserMiddleware } from '@globals/helpers/user-middlewares';
import { DeleteController } from '../controllers/delete-image';
import { GetController } from '../controllers/get-images';

class ImageRoutes {
  private router: Router;
  private imageController: ImageController;
  private deleteController: DeleteController;
  private getController: GetController;


  constructor() {
    this.router = express.Router();
    this.imageController = new ImageController();
    this.deleteController = new DeleteController();
    this.getController = new GetController();


  }

  public routes(): Router {
    // this.router.get('/:userId',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.getImages);
    this.router.post('/profile',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.addProfileImage);
    this.router.post('/background',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.imageController.backgroundImage);
    this.router.delete('/:imageId',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.deleteController.deleteImage);
    this.router.delete('/background/:bgImageId',AuthMiddleware.validateJWT,UserMiddleware.getUserDetails, this.deleteController.deleteBackgroundImage);


    this.router.get('/:userId', AuthMiddleware.validateJWT, this.getController.images);

    return this.router;
  }
}

export const imageRoutes: ImageRoutes = new ImageRoutes();
