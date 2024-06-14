/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '@root/feactures/user/models/user.model';
import { UserEntity } from '@root/feactures/auth/entities/user.entity';

interface CustomRequest extends Request {
  userId?: string;
  authUser?: any;
}

export class UserMiddleware {
  static async getUserDetails(req: CustomRequest, res: Response, next: NextFunction) {
    const authUser = req.authUser;

    try {
      if (!authUser) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const user = await UserModel.findOne({ authId: authUser._id })
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

      if (!user) {
        return res.status(401).json({ error: 'User not found in UserModel' });
      }

      req.body.user = UserEntity.fromObject({
        ...user.toObject(),
        emailValidated: authUser.emailValidated,
        password: authUser.password,
        role: authUser.role,
        country: authUser.country,
        img: authUser.img,
        createdAt: authUser.createdAt
      });

      console.log('Authenticated user details:', req.body.user);

      next();
    } catch (error) {
      console.log('Internal server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
