import { VideoModel } from '../models/video.model';
import { IVideo } from '../interfaces/video.interface';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@globals/helpers/cloudinary-upload';
import { BadRequestError } from '@globals/helpers/error-handler';
import mongoose from 'mongoose';
import { CreateVideoDto, UpdateVideoDto, UploadVideoDto } from '../dtos/video.dto';

class VideoService {
  public async createVideo(userId: string, videoData: CreateVideoDto): Promise<IVideo> {
    const video = new VideoModel({
      userId: new mongoose.Types.ObjectId(userId),
      ...videoData
    });
    await video.save();
    return video;
  }

  public async uploadVideo(userId: string, videoData: UploadVideoDto): Promise<IVideo> {
    const result: UploadApiResponse = (await uploads(videoData.video)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }

    const url = `https://res.cloudinary.com/dzqpacupf/video/upload/v${result.version}/${result.public_id}`;

    const video = new VideoModel({
      userId: new mongoose.Types.ObjectId(userId),
      title: videoData.title,
      description: videoData.description,
      privacy: videoData.privacy,
      url
    });
    await video.save();
    return video;
  }

  public async updateVideo(videoId: string, videoData: UpdateVideoDto): Promise<IVideo | null> {
    return VideoModel.findByIdAndUpdate(videoId, videoData, { new: true }).exec();
  }

  public async deleteVideo(videoId: string): Promise<IVideo | null> {
    return VideoModel.findByIdAndDelete(videoId).exec();
  }

  public async getUserVideos(userId: string): Promise<IVideo[]> {
    return VideoModel.find({ userId: new mongoose.Types.ObjectId(userId) }).exec();
  }
}

export const videoService = new VideoService();
