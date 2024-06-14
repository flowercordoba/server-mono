import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { AuthModel } from '@root/feactures/auth/models/auth.model';
import { UserEntity } from '@root/feactures/auth/entities/user.entity';

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    console.log('Authorization header:', authorization);

    if (!authorization) {
      console.log('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }
    if (!authorization.startsWith('Bearer ')) {
      console.log('Invalid Bearer token');
      return res.status(401).json({ error: 'Invalid Bearer token' });
    }

    const token = authorization.split(' ')[1] || '';
    console.log('Token:', token);

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      console.log('Payload:', payload);
      
      if (!payload) {
        console.log('Invalid token');
        return res.status(401).json({ error: 'Invalid token' });
      }

      const user = await AuthModel.findById(payload.id);
      console.log('User:', user);
      
      if (!user) {
        console.log('Invalid token - user not found');
        return res.status(401).json({ error: 'Invalid token - user' });
      }

      req.body.user = UserEntity.fromObject(user);
      console.log('UserEntity:', req.body.user);

      next();
    } catch (error) {
      console.log('Internal server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
