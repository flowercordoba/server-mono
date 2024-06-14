
import { CustomError } from '@globals/helpers/custom.error';
import bcrypt from 'bcryptjs';
import { AuthModel } from '../models/auth.model';

export class PasswordService {
  public async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = await AuthModel.findById(userId);
    if (!user) throw CustomError.notFound('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
  }
}
