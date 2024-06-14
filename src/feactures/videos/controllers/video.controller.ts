import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { videoService } from '../services/video.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateVideoDto, UploadVideoDto, UpdateVideoDto } from '../dtos/video.dto';

interface CustomRequest extends Request {
  userId?: string;
}

export class VideoController {
  constructor() {
    this.createVideo = this.createVideo.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
    this.getUserVideos = this.getUserVideos.bind(this);
  }

  public async createVideo(req: CustomRequest, res: Response): Promise<void> {
    const createVideoDto = plainToClass(CreateVideoDto, req.body);
    const errors = await validate(createVideoDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const video = await videoService.createVideo(req.userId!, createVideoDto);
    res.status(HTTP_STATUS.CREATED).json(video);
  }

  public async uploadVideo(req: CustomRequest, res: Response): Promise<void> {
    const uploadVideoDto = plainToClass(UploadVideoDto, req.body);
    const errors = await validate(uploadVideoDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const video = await videoService.uploadVideo(req.userId!, uploadVideoDto);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Video uploaded successfully', video });
  }

  public async updateVideo(req: Request, res: Response): Promise<void> {
    const updateVideoDto = plainToClass(UpdateVideoDto, req.body);
    const errors = await validate(updateVideoDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const video = await videoService.updateVideo(req.params.videoId, updateVideoDto);
    if (!video) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Video not found' });
      return;
    }

    res.status(HTTP_STATUS.OK).json(video);
  }

  public async deleteVideo(req: Request, res: Response): Promise<void> {
    const video = await videoService.deleteVideo(req.params.videoId);
    if (!video) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Video not found' });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: 'Video deleted successfully' });
  }

  public async getUserVideos(req: Request, res: Response): Promise<void> {
    const videos = await videoService.getUserVideos(req.params.userId);
    res.status(HTTP_STATUS.OK).json(videos);
  }
}
