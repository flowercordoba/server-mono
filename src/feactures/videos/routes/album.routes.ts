import express, { Router } from 'express';
import { VideoController } from '../controllers/video.controller';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { UserMiddleware } from '@globals/helpers/user-middlewares';

class VideoRoutes {
  private router: Router;
  private videoController: VideoController;

  constructor() {
    this.router = express.Router();
    this.videoController = new VideoController();
  }

  public routes(): Router {
    this.router.post('/', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.videoController.createVideo);
    this.router.post('/upload', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.videoController.uploadVideo);
    this.router.put('/:videoId', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.videoController.updateVideo);
    this.router.delete('/:videoId', AuthMiddleware.validateJWT, UserMiddleware.getUserDetails, this.videoController.deleteVideo);
    this.router.get('/user/:userId', AuthMiddleware.validateJWT, this.videoController.getUserVideos);

    return this.router;
  }
}

export const videoRoutes: VideoRoutes = new VideoRoutes();
