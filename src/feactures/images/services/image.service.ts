import { UserModel } from '@root/feactures/user/models/user.model';
// import mongoose from 'mongoose';
import { IFileImageDocument } from '../interfaces/image.interface';
import { ImageModel } from '../models/image.schema';

class ImageService {
  public async addUserProfileImageToDB(userId: string, url: string, imgId: string, imgVersion: string): Promise<void> {
    console.log('Adding profile image to DB for user:', userId); // Log de depuración

    await UserModel.updateOne({ _id: userId }, { $set: { profilePicture: url } }).exec();
    await this.addImage(userId, imgId, imgVersion, 'profile', url);
  }

  public async addBackgroundImageToDB(userId: string, url: string, imgId: string, imgVersion: string): Promise<void> {
    console.log('Adding background image to DB for user:', userId); // Log de depuración
    await UserModel.updateOne({ _id: userId }, { $set: { bgImageId: imgId, bgImageVersion: imgVersion } }).exec();
    await this.addImage(userId, imgId, imgVersion, 'background', url);
  }

  public async addImage(userId: string, url: string, imgId: string, imgVersion: string, type: string): Promise<void> {
    console.log('Storing image in DB for user:', userId); // Log de depuración
    await ImageModel.create({
      userId,
      bgImageVersion: type === 'background' ? imgVersion : '',
      bgImageId: type === 'background' ? imgId : '',
      imgVersion,
      imgId,
      url
    });
  }

  public async removeImageFromDB(imageId: string): Promise<void> {
    await ImageModel.deleteOne({ _id: imageId }).exec();
  }

  public async getImageByBackgroundId(bgImageId: string): Promise<IFileImageDocument> {
    const image: IFileImageDocument = (await ImageModel.findOne({ bgImageId }).exec()) as IFileImageDocument;
    return image;
  }

  public async getImages(userId: string): Promise<IFileImageDocument[]> {
    console.log('Searching images for userId:', userId); // Log para depuración
    const images: IFileImageDocument[] = await ImageModel.find({ userId }).exec();
    console.log('Images found:', images); // Log para depuración
    return images;
  }

  public async getUserWithImages(userId: string): Promise<IFileImageDocument[]> {
    console.log('Searching images for userId:', userId); // Log para depuración
    const user = await UserModel.findById(userId).populate('imagesId').exec();
    
    let images: IFileImageDocument[] = [];
    if (user && user.imagesId) {
      images = user.imagesId as unknown as IFileImageDocument[];
    }
    
    console.log('Images found:', images); // Log para depuración
    return images;
  }
  
}

export const imageService: ImageService = new ImageService();
