import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { albumService } from '../services/album.service';
import { CreateAlbumDto, UpdateAlbumDto, UploadMediaDto } from '../dtos/album.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { IMedia } from '../interfaces/album.interface';
import { UploadApiResponse, uploads } from '@globals/helpers/cloudinary-upload';
import { BadRequestError } from '../../../shared/global/helpers/error-handler';

interface CustomRequest extends Request {
  userId?: string;
}

export class AlbumController {
  constructor() {
    this.createAlbum = this.createAlbum.bind(this);
    this.updateAlbum = this.updateAlbum.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);
    this.getAlbumById = this.getAlbumById.bind(this);
    this.getUserAlbums = this.getUserAlbums.bind(this);
    this.addMediaToAlbum = this.addMediaToAlbum.bind(this);
    this.removeMediaFromAlbum = this.removeMediaFromAlbum.bind(this);
    this.uploadMedia = this.uploadMedia.bind(this);
  }

  public async createAlbum(req: CustomRequest, res: Response): Promise<void> {
    const createAlbumDto = plainToClass(CreateAlbumDto, req.body);
    const errors = await validate(createAlbumDto);
    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const album = await albumService.createAlbum(req.userId!, createAlbumDto);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Album created successfully', album });
  }

  public async updateAlbum(req: Request, res: Response): Promise<void> {
    const updateAlbumDto = plainToClass(UpdateAlbumDto, req.body);
    const errors = await validate(updateAlbumDto);
    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const album = await albumService.updateAlbum(req.params.albumId, updateAlbumDto);
    if (!album) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Album not found' });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: 'Album updated successfully', album });
  }

  public async deleteAlbum(req: Request, res: Response): Promise<void> {
    await albumService.deleteAlbum(req.params.albumId);
    res.status(HTTP_STATUS.OK).json({ message: 'Album deleted successfully' });
  }

  public async getAlbumById(req: Request, res: Response): Promise<void> {
    const album = await albumService.getAlbumById(req.params.albumId);
    if (!album) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Album not found' });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: 'Album retrieved successfully', album });
  }

  public async getUserAlbums(req: CustomRequest, res: Response): Promise<void> {
    const albums = await albumService.getUserAlbums(req.userId!);
    res.status(HTTP_STATUS.OK).json({ message: 'User albums retrieved successfully', albums });
  }

  // public async addMediaToAlbum(req: Request, res: Response): Promise<void> {
  //   const media: IMedia = req.body;
  //   const album = await albumService.addMediaToAlbum(req.params.albumId, media);
  //   if (!album) {
  //     res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Album not found' });
  //     return;
  //   }

  //   res.status(HTTP_STATUS.OK).json({ message: 'Media added to album successfully', album });
  // }
  public async addMediaToAlbum(req: CustomRequest, res: Response): Promise<void> {
    const { albumId } = req.params;
    const uploadMediaDto = plainToClass(UploadMediaDto, req.body);
    const errors = await validate(uploadMediaDto);

    if (errors.length > 0) {
      console.log(errors);
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const result: UploadApiResponse = (await uploads(uploadMediaDto.media)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }
    const url = `https://res.cloudinary.com/dzqpacupf/image/upload/v${result.version}/${result.public_id}`;

    const media: IMedia = {
      url,
      type: uploadMediaDto.type
    };

    const album = await albumService.addMediaToAlbum(albumId, media);

    res.status(HTTP_STATUS.OK).json({ message: 'Media uploaded successfully', album });
  }
  public async removeMediaFromAlbum(req: Request, res: Response): Promise<void> {
    const { mediaUrl } = req.body;
    const album = await albumService.removeMediaFromAlbum(req.params.albumId, mediaUrl);
    if (!album) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Album not found' });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: 'Media removed from album successfully', album });
  }

  public async uploadMedia(req: CustomRequest, res: Response): Promise<void> {
    const uploadMediaDto = plainToClass(UploadMediaDto, req.body);
    const errors = await validate(uploadMediaDto);

    if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      return;
    }

    const result: UploadApiResponse = (await uploads(uploadMediaDto.media)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }
    const url = `https://res.cloudinary.com/dzqpacupf/image/upload/v${result.version}/${result.public_id}`;

    const media: IMedia = {
      url,
      type: uploadMediaDto.type
    };

    const album = await albumService.addMediaToAlbum(uploadMediaDto.albumId, media);

    res.status(HTTP_STATUS.OK).json({ message: 'Media uploaded successfully', album });
  }
}
