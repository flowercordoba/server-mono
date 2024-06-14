import { UpdateAboutUserDto } from '../dtos/about-update.user.dto';
import { UserModel } from '../models/user.model';
import { CustomError } from '@globals/helpers/custom.error';

export class AboutService {
  public async updateUserAboutMe(userId: string, updateAboutUserDto: UpdateAboutUserDto) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw CustomError.notFound('User not found');
      }

      if (updateAboutUserDto.aboutme !== undefined) {
        user.aboutme = updateAboutUserDto.aboutme;
      }

      await user.save();
      return user;
    } catch (error) {
        console.log('error',error);
    //   throw CustomError.internalServer(error);
    }
  }
}
