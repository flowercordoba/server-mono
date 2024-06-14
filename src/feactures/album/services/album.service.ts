import { AlbumModel } from '../models/album.model';
import { IAlbum, IMedia } from '../interfaces/album.interface';
import { CreateAlbumDto, UpdateAlbumDto } from '../dtos/album.dto';

class AlbumService {
  public async createAlbum(userId: string, createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const album = new AlbumModel({ ...createAlbumDto, userId });
    return album.save();
  }

  public async updateAlbum(albumId: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum | null> {
    return AlbumModel.findByIdAndUpdate(albumId, updateAlbumDto, { new: true }).exec();
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    await AlbumModel.findByIdAndDelete(albumId).exec();
  }

  public async getAlbumById(albumId: string): Promise<IAlbum | null> {
    return AlbumModel.findById(albumId).exec();
  }

  public async getUserAlbums(userId: string): Promise<IAlbum[]> {
    return AlbumModel.find({ userId }).exec();
  }

  public async addMediaToAlbum(albumId: string, media: IMedia): Promise<IAlbum | null> {
    return AlbumModel.findByIdAndUpdate(albumId, { $push: { media } }, { new: true }).exec();
  }

  public async removeMediaFromAlbum(albumId: string, mediaUrl: string): Promise<IAlbum | null> {
    return AlbumModel.findByIdAndUpdate(albumId, { $pull: { media: { url: mediaUrl } } }, { new: true }).exec();
  }
}

export const albumService = new AlbumService();
