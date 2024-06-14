/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { AuthModel } from '@root/feactures/auth/models/auth.model';
import { UserModel } from '@root/feactures/user/models/user.model';
import { UserEntity } from '@root/feactures/auth/entities/user.entity';

interface CustomRequest extends Request {
  userId?: string;
  authUser?: any;
}

export class AuthMiddleware {
  static async validateJWT(req: CustomRequest, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');

    if (!authorization) {
      return res.status(401).json({ error: 'No token provided' });
    }
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid Bearer token' });
    }

    const token = authorization.split(' ')[1] || '';
    console.log('Token:', token);

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      console.log('Payload ID:', payload.id);
      const authUser = await AuthModel.findById(payload.id);
      console.log('Auth User:', authUser);

      if (!authUser) {
        return res.status(401).json({ error: 'Invalid token - user not found in AuthModel' });
      }

      const user = await UserModel.findOne({ authId: authUser._id });
      console.log('User:', user);

      if (!user) {
        return res.status(401).json({ error: 'Invalid token - user not found in UserModel' });
      }

      req.authUser = authUser;
      req.body.user = UserEntity.fromObject({
        ...user.toObject(),
        emailValidated: authUser.emailValidated,
        password: authUser.password,
        role: authUser.role,
        country: authUser.country,
        img: authUser.img,
        createdAt: authUser.createdAt
      });
      req.userId = user._id.toString();

      console.log('Authenticated user:', req.body.user);
      console.log('User ID:', req.userId);

      next();
    } catch (error) {
      console.log('Internal server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
