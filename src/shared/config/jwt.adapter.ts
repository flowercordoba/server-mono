/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_TOKEN = envs.JWT_TOKEN;

export class JwtAdapter {
  // DI?

  static async generateToken(payload: any, duration: string = '12h') {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_TOKEN, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_TOKEN, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
