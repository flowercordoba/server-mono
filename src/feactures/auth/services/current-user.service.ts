import { JwtAdapter } from '@root/shared/config';
import { UserEntity } from '../entities/user.entity';
import { AuthModel } from '../models/auth.model';
import { CustomError } from '@globals/helpers/custom.error';

export class CurrentUserService {
  public async getCurrentUserById(id: string): Promise<UserEntity> {
    const user = await AuthModel.findById(id);
    if (!user) throw CustomError.notFound('User not found');
    return UserEntity.fromObject(user);
  }

  public async getUserByName(username: string): Promise<UserEntity> {
    const user = await AuthModel.findOne({ username });
    if (!user) throw CustomError.notFound('User not found');
    return UserEntity.fromObject(user);
  }

  public async refreshToken(username: string): Promise<{ token: string, user: UserEntity }> {
    const user = await this.getUserByName(username);
    const token = await JwtAdapter.generateToken({ id: user.id }) as string;
    if (!token) throw CustomError.internalServer('Error while creating JWT');
    return { token, user };
  }
}
