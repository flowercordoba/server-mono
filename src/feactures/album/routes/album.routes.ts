import express, { Router } from 'express';
import { AlbumController } from '../controllers/album.controller';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { UserMiddleware } from '@globals/helpers/user-middlewares';

class AlbumRoutes {
  private router: Router;
  private albumController: AlbumController;

  constructor() {
    this.router = express.Router();
    this.albumController = new AlbumController();
  }

  public routes(): Router {
    this.router.post('/create', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.albumController.createAlbum);
    this.router.put('/update/:albumId', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.albumController.updateAlbum);
    this.router.delete('/delete/:albumId', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.albumController.deleteAlbum);
    this.router.get('/get/:albumId', AuthMiddleware.validateJWT, this.albumController.getAlbumById);
    this.router.get('/user-albums', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.albumController.getUserAlbums);
    this.router.post('/add-media/:albumId', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.albumController.addMediaToAlbum);
    this.router.delete('/remove-media/:albumId', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.albumController.removeMediaFromAlbum);
    this.router.post('/upload-media', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.albumController.uploadMedia);

    return this.router;
  }
}

export const albumRoutes: AlbumRoutes = new AlbumRoutes();
