import { UserEntity } from '../entities/user.entity';
import { CustomError } from '@globals/helpers/custom.error';
import { UserModel } from '@root/feactures/user/models/user.model';
import { JwtAdapter } from '@root/shared/config';
import mongoose from 'mongoose';
import { AuthModel } from '../models/auth.model';

export class CurrentUserService {
  public async getCurrentUserById(id: string): Promise<UserEntity> {
    console.log('getCurrentUserById: Searching user in UserModel with id:', id);

    // Convertir id a ObjectId para garantizar compatibilidad con MongoDB
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await UserModel.findById(objectId)
      .populate('friends')
      .populate('notifications')
      .populate('posts')
      .populate('blocked')
      .populate('blockedBy')
      .populate('featuredFriends')
      .populate('savedPosts')
      .populate('reels')
      .populate('stories')
      .populate('imagesId')
      .exec();

    console.log('user:', user);
    if (!user) throw CustomError.notFound('User not found in UserModel');

    // Verificar si el authId está presente y buscar en AuthModel
    const authUser = await AuthModel.findById(user.authId);
    if (!authUser) throw CustomError.notFound('Auth data not found for user');

    // Combinar datos de AuthModel y UserModel
    const combinedUser = {
      ...user.toObject(),
      emailValidated: authUser.emailValidated,
      password: authUser.password,
      role: authUser.role,
      country: authUser.country,
      img: authUser.img,
      createdAt: authUser.createdAt
    };

    console.log('Combined user:', combinedUser);
    return UserEntity.fromObject(combinedUser);
  }

  public async getUserByName(username: string): Promise<UserEntity> {
    const user = await UserModel.findOne({ username });
    if (!user) throw CustomError.notFound('User not found');
    return UserEntity.fromObject(user.toObject());
  }

  public async refreshToken(username: string): Promise<{ token: string, user: UserEntity }> {
    const user = await this.getUserByName(username);
    const token = await JwtAdapter.generateToken({ id: user.id }) as string;
    if (!token) throw CustomError.internalServer('Error while creating JWT');
    return { token, user };
  }
}
